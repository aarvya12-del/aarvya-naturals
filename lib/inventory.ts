import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { CartItem } from "@/context/CartContext";
import type { Product } from "@/types/product";
import { comboProducts } from "@/data/comboProducts";

/**
 * A product is "unit tracked" (pieces, not weight) when it only
 * has ONE pack option — a bottle of wine, a jar of honey, a fixed
 * breakfast mix. Anything with more than one weight option
 * (100g/250g/500g/1kg) is "weight tracked" instead. This is
 * inferred automatically from the product's own variants — no
 * extra admin decision needed.
 */
export function isUnitTracked(product: Pick<Product, "variants">): boolean {
  return product.variants.length === 1;
}

/** Converts a variant weight label ("250g", "1kg") into grams. */
export function parseWeightToGrams(weight: string): number {
  const trimmed = weight.trim().toLowerCase();

  if (trimmed.endsWith("kg")) return parseFloat(trimmed) * 1000;
  if (trimmed.endsWith("g")) return parseFloat(trimmed);
  if (trimmed.endsWith("ml")) return parseFloat(trimmed);
  if (trimmed.endsWith("l")) return parseFloat(trimmed) * 1000;

  return 0;
}

/** Admin-only formatting — never surface this to customers. */
export function formatGrams(grams: number): string {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(grams % 1000 === 0 ? 0 : 1)} kg`;
  }
  return `${grams} g`;
}

/** Admin-only formatting for unit-tracked products. */
export function formatUnits(units: number): string {
  return `${units} pc${units === 1 ? "" : "s"}`;
}

/**
 * ⚠️ No longer called anywhere in the app. Kept only so nothing
 * breaks if something still imports it. Stock is now deducted when
 * an order reaches "Delivered" instead — see
 * deductInventoryOnDelivery below — so that a cancelled-before-
 * shipping order never needs a manual stock reversal.
 */
export async function decrementStockForOrder(cart: CartItem[]) {
  const productItems = cart.filter((item) => item.type === "product");

  await Promise.all(
    productItems.map(async (item) => {
      try {
        const ref = doc(db, "products", item.slug);
        const snap = await getDoc(ref);
        if (!snap.exists()) return;

        const data = snap.data();
        const unitTracked = (data.variants?.length ?? 0) === 1;

        if (unitTracked) {
          if (typeof data.stockUnits !== "number") return;
          const newUnits = Math.max(0, data.stockUnits - item.quantity);
          await updateDoc(ref, { stockUnits: newUnits, stock: newUnits > 0 });
        } else {
          if (typeof data.stockGrams !== "number") return;
          const grams = parseWeightToGrams(item.variant) * item.quantity;
          if (grams <= 0) return;
          const newGrams = Math.max(0, data.stockGrams - grams);
          await updateDoc(ref, { stockGrams: newGrams, stock: newGrams > 0 });
        }
      } catch (err) {
        console.error(`Stock update failed for ${item.slug}:`, err);
      }
    })
  );
}

/**
 * Called when an admin marks an order as "Delivered". Deducts real
 * stock for everything in the order:
 *  - Regular products deduct directly.
 *  - Combos are expanded into their component products (including
 *    free bonus items) — there's no separate "combo stock", a combo
 *    is just a bundle of products that already have their own stock.
 *
 * If the same product appears twice in one order (bought on its own
 * AND inside a combo), the two are merged into a single total BEFORE
 * any Firestore read/write happens — reading and writing each
 * product only once avoids a race condition where two separate
 * updates could overwrite each other.
 *
 * Only touches products that already have a stock number set by an
 * admin. Never throws — a stock-tracking hiccup should never block
 * the order status update itself.
 */
export async function deductInventoryOnDelivery(cart: CartItem[]) {
  type RawEntry = { weightLabel: string; packsBought: number };
  const rawBySlug = new Map<string, RawEntry[]>();

  function addEntry(slug: string, weightLabel: string, packsBought: number) {
    const list = rawBySlug.get(slug) ?? [];
    list.push({ weightLabel, packsBought });
    rawBySlug.set(slug, list);
  }

  for (const item of cart) {
    if (item.type === "product") {
      addEntry(item.slug, item.variant, item.quantity);
      continue;
    }

    // Combo — expand into its component products (paid + free items).
    const combo = comboProducts.find((c) => c.slug === item.slug);
    if (!combo) continue;

    for (const part of [...combo.products, ...combo.freeProducts]) {
      addEntry(part.slug, part.quantity, item.quantity);
    }
  }

  await Promise.all(
    Array.from(rawBySlug.entries()).map(async ([slug, entries]) => {
      try {
        const ref = doc(db, "products", slug);
        const snap = await getDoc(ref);
        if (!snap.exists()) return;

        const data = snap.data();
        const unitTracked = (data.variants?.length ?? 0) === 1;

        if (unitTracked) {
          if (typeof data.stockUnits !== "number") return;

          const totalUnits = entries.reduce((sum, e) => {
            // Combo component quantities are usually weight strings
            // ("100g"), but if this particular component is itself a
            // unit-tracked product, its "quantity" should just be a
            // plain count instead — fall back to 1 per pack if it
            // doesn't parse as a clean integer.
            const parsed = parseInt(e.weightLabel, 10);
            const isPlainNumber =
              Number.isFinite(parsed) && String(parsed) === e.weightLabel.trim();
            const perPack = isPlainNumber ? parsed : 1;
            return sum + perPack * e.packsBought;
          }, 0);

          const newUnits = Math.max(0, data.stockUnits - totalUnits);
          await updateDoc(ref, { stockUnits: newUnits, stock: newUnits > 0 });
        } else {
          if (typeof data.stockGrams !== "number") return;

          const totalGrams = entries.reduce(
            (sum, e) => sum + parseWeightToGrams(e.weightLabel) * e.packsBought,
            0
          );
          if (totalGrams <= 0) return;

          const newGrams = Math.max(0, data.stockGrams - totalGrams);
          await updateDoc(ref, { stockGrams: newGrams, stock: newGrams > 0 });
        }
      } catch (err) {
        console.error(`Stock deduction failed for ${slug}:`, err);
      }
    })
  );
}

/** Manual weight-based adjustment (+500g, -250g) — multi-pack products. */
export async function adjustStock(slug: string, deltaGrams: number) {
  const ref = doc(db, "products", slug);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const current = (snap.data().stockGrams as number) ?? 0;
  const newGrams = Math.max(0, current + deltaGrams);

  await updateDoc(ref, { stockGrams: newGrams, stock: newGrams > 0 });
}

/** Manual unit-based adjustment (+1, -1) — single-pack products. */
export async function adjustStockUnits(slug: string, delta: number) {
  const ref = doc(db, "products", slug);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const current = (snap.data().stockUnits as number) ?? 0;
  const newUnits = Math.max(0, current + delta);

  await updateDoc(ref, { stockUnits: newUnits, stock: newUnits > 0 });
}

/** Set an exact weight-based stock value (typed directly in the modal). */
export async function setStock(slug: string, grams: number) {
  const newGrams = Math.max(0, grams);
  await updateDoc(doc(db, "products", slug), {
    stockGrams: newGrams,
    stock: newGrams > 0,
  });
}

/** Set an exact unit-based stock value (typed directly in the modal). */
export async function setStockUnits(slug: string, units: number) {
  const newUnits = Math.max(0, units);
  await updateDoc(doc(db, "products", slug), {
    stockUnits: newUnits,
    stock: newUnits > 0,
  });
}
