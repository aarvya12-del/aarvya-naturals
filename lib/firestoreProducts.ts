import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/types/product";
import type { ComboProduct } from "@/data/comboProducts";

const PRODUCTS_COLLECTION = "products";
const COMBOS_COLLECTION = "combos";

// ---------- PRODUCTS ----------

export async function getAllProductsFromFirestore(): Promise<Product[]> {
  const snap = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return snap.docs.map((d) => d.data() as Product);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, PRODUCTS_COLLECTION, slug));
  return snap.exists() ? (snap.data() as Product) : null;
}

// Uses the product's slug as the Firestore document ID, so re-running
// migration or re-saving an edit never creates duplicates.
export async function saveProductToFirestore(product: Product) {
  await setDoc(doc(db, PRODUCTS_COLLECTION, product.slug), product);
}

export async function updateProductInFirestore(
  slug: string,
  changes: Partial<Product>
) {
  await updateDoc(doc(db, PRODUCTS_COLLECTION, slug), changes);
}

export async function deleteProductFromFirestore(slug: string) {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, slug));
}

// ---------- COMBOS ----------

export async function getAllCombosFromFirestore(): Promise<ComboProduct[]> {
  const snap = await getDocs(collection(db, COMBOS_COLLECTION));
  return snap.docs.map((d) => d.data() as ComboProduct);
}

export async function getComboBySlug(slug: string): Promise<ComboProduct | null> {
  const snap = await getDoc(doc(db, COMBOS_COLLECTION, slug));
  return snap.exists() ? (snap.data() as ComboProduct) : null;
}

export async function saveComboToFirestore(combo: ComboProduct) {
  await setDoc(doc(db, COMBOS_COLLECTION, combo.slug), combo);
}

export async function updateComboInFirestore(
  slug: string,
  changes: Partial<ComboProduct>
) {
  await updateDoc(doc(db, COMBOS_COLLECTION, slug), changes);
}

export async function deleteComboFromFirestore(slug: string) {
  await deleteDoc(doc(db, COMBOS_COLLECTION, slug));
}
