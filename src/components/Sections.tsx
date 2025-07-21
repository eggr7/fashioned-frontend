"use client";
import { useQuery } from "@apollo/client";
import client from "@/lib/apollo";
import { GET_PRODUCTS /*, GET_TRENDING */ } from "@/lib/queries"; // ajusta si creas otra query

// ─── Tipos ──────────────────────────────────────────────
interface Category {
  name: string;
}

interface Size {
  label: string;
}

interface Color {
  name: string;
  hexCode: string;
}

interface Image {
  url: string;
}

interface Product {
  name: string;
  price: number;
  category?: Category | null;
  sizes: Size[];
  colors: Color[];
  images: Image[];
}

interface ProductsData {
  products: Product[];
}

// ─── AllProducts ───────────────────────────────────────
export function AllProducts() {
  const { data, loading, error } = useQuery<ProductsData>(GET_PRODUCTS, {
    client,
  });

  return (
    <section id="products" className="min-h-screen py-20 px-4">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
        All Products
      </h2>

      {/* Estados */}
      {loading && <p className="text-gray-500">Cargando productos…</p>}
      {error && (
        <p className="text-red-500">
          Error al cargar productos: {error.message}
        </p>
      )}

      {/* Lista de productos */}
      {data && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.products.map((product, i) => (
            <div
              key={i}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {product.name}
              </h3>

              <p className="text-sm text-gray-500 mb-1">
                Category: {product.category?.name ?? "N/A"}
              </p>

              <p className="font-medium text-indigo-600 dark:text-indigo-400">
                ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Sin productos */}
      {!loading && !error && data?.products.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}
    </section>
  );
}

// ─── Trendings (placeholder) ────────────────────────────
export function Trendings() {
  // Si más adelante tienes una query específica, reemplázala aquí
  return (
    <section id="trending" className="min-h-screen py-20 px-4">
      <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Trendings
      </h2>
      <p className="text-gray-800 dark:text-gray-400 font-medium">
        Trending items will be displayed here.
      </p>
    </section>
  );
}

// ─── AboutSection ──────────────────────────────────────
export function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-20 px-4">
      <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        About FashionED
      </h2>
      <p className="text-gray-800 dark:text-gray-400 font-medium">
        We are a modern fashion brand bringing you the latest trends.
      </p>
    </section>
  );
}
