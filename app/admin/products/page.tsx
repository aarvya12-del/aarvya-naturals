"use client";

import { useEffect, useState } from "react";
import {
  adjustStock,
  adjustStockUnits,
  formatGrams,
  formatUnits,
  isUnitTracked,
} from "@/lib/inventory";
import type { Product, ProductVariant } from "@/types/product";
import type { ComboProduct } from "@/data/comboProducts";
import { products as staticProducts } from "@/data/products";
import { comboProducts as staticCombos } from "@/data/comboProducts";
import {
  getAllProductsFromFirestore,
  saveProductToFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
  getAllCombosFromFirestore,
  saveComboToFirestore,
  updateComboInFirestore,
  deleteComboFromFirestore,
} from "@/lib/firestoreProducts";

const CATEGORIES = [
  "Dry Fruits",
  "Flavoured Nuts",
  "Seeds",
  "Honey Collection",
  "Dates",
  "Healthy Snacks",
  "Healthy Essentials",
];

const emptyProduct = (): Product => ({
  id: Date.now(),
  slug: "",
  name: "",
  category: CATEGORIES[0],
  image: "/images/products/almond.png",
  shortDescription: "",
  description: "",
  benefits: [],
  variants: [
    { id: "100g", weight: "100g", price: 0, mrp: 0, stock: true },
    { id: "250g", weight: "250g", price: 0, mrp: 0, stock: true },
    { id: "500g", weight: "500g", price: 0, mrp: 0, stock: true },
    { id: "1kg", weight: "1kg", price: 0, mrp: 0, stock: true },
  ],
  featured: false,
  bestseller: false,
  newArrival: false,
  stock: true,
  stockGrams: 0,
  lowStockAlertGrams: 500,
});

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [combos, setCombos] = useState<ComboProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const inventoryValue = products.reduce((total, product) => {
    if (isUnitTracked(product)) {
      return total + (product.stockUnits ?? 0) * (product.variants[0]?.price ?? 0);
    }

    const oneKg = product.variants.find(v => v.weight.toLowerCase() === "1kg");
    const pricePerKg = oneKg?.price ?? 0;

    return total + ((product.stockGrams ?? 0) / 1000) * pricePerKg;
  }, 0);


  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const [p, c] = await Promise.all([
      getAllProductsFromFirestore(),
      getAllCombosFromFirestore(),
    ]);
    setProducts(p);
    setCombos(c);
    setLoading(false);
  }

  async function runMigration() {
    setMigrating(true);
    try {
      for (const product of staticProducts) {
        await saveProductToFirestore(product as Product);
      }
      for (const combo of staticCombos) {
        await saveComboToFirestore(combo);
      }
      await load();
      alert("Migration complete! Your catalog now lives in Firestore.");
    } catch (err) {
      console.error(err);
      alert(
        "Migration failed — check the browser console. Likely a Firestore rules issue (make sure the products/combos rules were published)."
      );
    } finally {
      setMigrating(false);
    }
  }

  async function toggleStock(product: Product) {
    const newStock = !product.stock;
    setProducts((prev) =>
      prev.map((p) => (p.slug === product.slug ? { ...p, stock: newStock } : p))
    );
    try {
      await updateProductInFirestore(product.slug, { stock: newStock });
    } catch (err) {
      console.error(err);
      alert("Failed to update stock status.");
      load();
    }
  }

  async function deleteProduct(product: Product) {
    if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return;
    try {
      await deleteProductFromFirestore(product.slug);
      setProducts((prev) => prev.filter((p) => p.slug !== product.slug));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  }

  async function deleteCombo(combo: ComboProduct) {
    if (!confirm(`Delete "${combo.name}"? This can't be undone.`)) return;
    try {
      await deleteComboFromFirestore(combo.slug);
      setCombos((prev) => prev.filter((c) => c.slug !== combo.slug));
    } catch (err) {
      console.error(err);
      alert("Failed to delete combo.");
    }
  }

  async function updateComboPrice(combo: ComboProduct, newPrice: number) {
    setCombos((prev) =>
      prev.map((c) => (c.slug === combo.slug ? { ...c, price: newPrice } : c))
    );
    try {
      await updateComboInFirestore(combo.slug, { price: newPrice });
    } catch (err) {
      console.error(err);
      alert("Failed to update combo price.");
      load();
    }
  }

  async function saveEditingProduct() {
    if (!editing) return;
    if (!editing.slug.trim() || !editing.name.trim()) {
      alert("Name and slug are required.");
      return;
    }
    setSaving(true);
    try {
      await saveProductToFirestore(editing);
      await load();
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save product.");
    } finally {
      setSaving(false);
    }
  }

  function updateVariant(index: number, field: keyof ProductVariant, value: string) {
    if (!editing) return;
    const variants = [...editing.variants];
    variants[index] = {
      ...variants[index],
      [field]: field === "price" || field === "mrp" ? Number(value) : value,
    };
    setEditing({ ...editing, variants });
  }

  const filteredProducts = products.filter((p)=>{const q=searchTerm.toLowerCase().trim();return p.name.toLowerCase().includes(q)||p.slug.toLowerCase().includes(q)||p.category.toLowerCase().includes(q);});
  const filteredCombos = combos.filter((c)=>{const q=searchTerm.toLowerCase().trim();return c.name.toLowerCase().includes(q)||c.slug.toLowerCase().includes(q)||c.category.toLowerCase().includes(q);});

  return (
    <div>

      <div className="mb-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm max-w-sm">
          <p className="text-sm text-gray-500">Inventory Value</p>
          <h2 className="mt-2 text-3xl font-bold text-green-700">
            ₹{inventoryValue.toLocaleString("en-IN",{maximumFractionDigits:0})}
          </h2>
          <p className="mt-1 text-xs text-gray-400">Based on current selling price</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0B3C8C]">Products</h1>
          <p className="mt-2 text-gray-500">
            {loading ? "Loading…" : `${products.length} products, ${combos.length} combos (live from Firestore)`}
          </p>
        </div>

        {!loading && products.length > 0 && (
          <div className="flex items-center gap-3">
            <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search products or combos..." className="w-72 rounded-full border border-gray-300 px-4 py-3 focus:border-[#0B3C8C] focus:outline-none" />
          <button
            onClick={() => setEditing(emptyProduct())}
            className="rounded-full bg-[#0B3C8C] px-6 py-3 font-semibold text-white hover:bg-[#082f6a]"
          >
            + Add Product
          </button>
          </div>
        )}
      </div>

      {/* Migration prompt if Firestore has no products yet */}
      {!loading && products.length === 0 && (
        <div className="mt-8 rounded-2xl border border-yellow-300 bg-yellow-50 p-8 text-center">
          <p className="text-lg font-semibold text-yellow-800">
            No products found in Firestore yet.
          </p>
          <p className="mt-2 text-yellow-700">
            Run this once to copy your existing catalog from the code files
            into Firestore. Safe to re-run — it won&apos;t create duplicates.
          </p>
          <button
            onClick={runMigration}
            disabled={migrating}
            className="mt-5 rounded-full bg-yellow-600 px-8 py-3 font-semibold text-white hover:bg-yellow-700 disabled:opacity-60"
          >
            {migrating ? "Migrating…" : "Migrate Catalog to Firestore"}
          </button>
        </div>
      )}

      {/* Products table */}
      {!loading && products.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Starting Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">Inventory</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.slug} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="px-5 py-3 text-gray-600">{p.category}</td>
                  <td className="px-5 py-3 text-[#0B3C8C]">₹{p.variants[0]?.price}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleStock(p)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        p.stock
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.stock ? "In Stock" : "Out of Stock"}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    {isUnitTracked(p) ? (
                      <>
                        <div className="flex items-center gap-2">
                          {typeof p.stockUnits === "number" ? (
                            <>
                              <span
                                className={`font-medium ${
                                  p.stockUnits <= (p.lowStockAlertUnits ?? 5)
                                    ? "text-red-600"
                                    : "text-gray-700"
                                }`}
                              >
                                {formatUnits(p.stockUnits)}
                              </span>

                              {p.stockUnits <= (p.lowStockAlertUnits ?? 5) && (
                                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                                  LOW
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-gray-400">
                              Not tracked yet
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex gap-1">
                          {[
                            { label: "+1", delta: 1 },
                            { label: "+5", delta: 5 },
                            { label: "-1", delta: -1 },
                          ].map((btn) => (
                            <button
                              key={btn.label}
                              onClick={async () => {
                                await adjustStockUnits(p.slug, btn.delta);
                                setProducts((prev) =>
                                  prev.map((row) =>
                                    row.slug === p.slug
                                      ? {
                                          ...row,
                                          stockUnits: Math.max(
                                            0,
                                            (row.stockUnits ?? 0) + btn.delta
                                          ),
                                        }
                                      : row
                                  )
                                );
                              }}
                              className="rounded border border-gray-300 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 hover:bg-gray-50"
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          {typeof p.stockGrams === "number" ? (
                            <>
                              <span
                                className={`font-medium ${
                                  p.stockGrams <= (p.lowStockAlertGrams ?? 500)
                                    ? "text-red-600"
                                    : "text-gray-700"
                                }`}
                              >
                                {formatGrams(p.stockGrams)}
                              </span>

                              {p.stockGrams <= (p.lowStockAlertGrams ?? 500) && (
                                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                                  LOW
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-gray-400">
                              Not tracked yet
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex gap-1">
                          {[
                            { label: "+500g", delta: 500 },
                            { label: "+1kg", delta: 1000 },
                            { label: "-250g", delta: -250 },
                          ].map((btn) => (
                            <button
                              key={btn.label}
                              onClick={async () => {
                                await adjustStock(p.slug, btn.delta);
                                setProducts((prev) =>
                                  prev.map((row) =>
                                    row.slug === p.slug
                                      ? {
                                          ...row,
                                          stockGrams: Math.max(
                                            0,
                                            (row.stockGrams ?? 0) + btn.delta
                                          ),
                                        }
                                      : row
                                  )
                                );
                              }}
                              className="rounded border border-gray-300 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 hover:bg-gray-50"
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </td>
                  <td className="px-5 py-3 space-x-3">
                    <button
                      onClick={() => setEditing(p)}
                      className="font-medium text-[#0B3C8C] hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Combos table */}
      {!loading && combos.length > 0 && (
        <>
          <h2 className="mt-10 text-xl font-semibold text-gray-700">
            Combos ({filteredCombos.length})
          </h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCombos.map((c) => (
                  <tr key={c.slug} className="border-t border-gray-100">
                    <td className="px-5 py-3 font-medium text-gray-800">{c.name}</td>
                    <td className="px-5 py-3 text-gray-600">{c.category}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1 text-[#0B3C8C]">
                        ₹
                        <input
                          type="number"
                          defaultValue={c.price}
                          onBlur={(e) => updateComboPrice(c, Number(e.target.value))}
                          className="w-24 rounded-lg border border-gray-300 px-2 py-1"
                        />
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => deleteCombo(c)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Edit / Add modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-[#0B3C8C]">
              {products.some((p) => p.slug === editing.slug) ? "Edit Product" : "Add Product"}
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Slug (unique, used in URL — e.g. premium-almonds)
                </label>
                <input
                  value={editing.slug}
                  onChange={(e) =>
                    setEditing({ ...editing, slug: e.target.value.trim().toLowerCase().replace(/\s+/g, "-") })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Short Description</label>
                <input
                  value={editing.shortDescription}
                  onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Full Description</label>
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Image path</label>
                <input
                  value={editing.image}
                  onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="/images/products/example.png"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Variants & Pricing</label>
                <div className="mt-2 space-y-2">
                  {editing.variants.map((v, i) => (
                    <div key={v.id} className="flex items-center gap-3">
                      <span className="w-16 text-sm text-gray-600">{v.weight}</span>
                      <span className="text-sm text-gray-500">₹</span>
                      <input
                        type="number"
                        value={v.price}
                        onChange={(e) => updateVariant(i, "price", e.target.value)}
                        className="w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
                        placeholder="Price"
                      />
                      <span className="text-sm text-gray-500">MRP ₹</span>
                      <input
                        type="number"
                        value={v.mrp}
                        onChange={(e) => updateVariant(i, "mrp", e.target.value)}
                        className="w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
                        placeholder="MRP"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {isUnitTracked(editing) ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Current Stock (pieces)
                    </label>
                    <input
                      type="number"
                      value={editing.stockUnits ?? 0}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          stockUnits: Number(e.target.value),
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      This product has one pack size, so stock is a plain count.
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Low Stock Alert (pieces)
                    </label>
                    <input
                      type="number"
                      value={editing.lowStockAlertUnits ?? 5}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          lowStockAlertUnits: Number(e.target.value),
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Current Stock (grams)
                    </label>
                    <input
                      type="number"
                      value={editing.stockGrams ?? 0}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          stockGrams: Number(e.target.value),
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      e.g. 5000 = 5 kg. Auto-reduces as orders come in.
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Low Stock Alert (grams)
                    </label>
                    <input
                      type="number"
                      value={editing.lowStockAlertGrams ?? 500}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          lowStockAlertGrams: Number(e.target.value),
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </div>
                </div>
              )}

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={editing.stock}
                  onChange={(e) => setEditing({ ...editing, stock: e.target.checked })}
                />
                In Stock
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="rounded-full border border-gray-300 px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEditingProduct}
                disabled={saving}
                className="rounded-full bg-[#0B3C8C] px-6 py-2.5 font-semibold text-white hover:bg-[#082f6a] disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}