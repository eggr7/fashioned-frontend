"use client";
import { useQuery } from "@apollo/client";
import client from "@/lib/apollo";
import { GET_PRODUCTS } from "@/lib/queries";
import ProductCard, { Product } from "./ProductCard";

/* ─── Tipos de la consulta ─────────────────────────── */
interface ProductsData {
  products: Product[];
}

/* ─── AllProducts ──────────────────────────────────── */
export function AllProducts() {
  const { data, loading, error } = useQuery<ProductsData>(GET_PRODUCTS, {
    client,
  });

  return (
    <section id="products" className="min-h-screen py-20 px-4">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
        All Products
      </h2>

      {loading && <p className="text-gray-500">Cargando productos…</p>}
      {error && (
        <p className="text-red-500">
          Error al cargar productos: {error.message}
        </p>
      )}

      {data && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.products.map((p, i) => (
            <ProductCard key={`${p.name}-${i}`} product={p} />
          ))}
        </div>
      )}

      {!loading && !error && data?.products.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}
    </section>
  );
}

/* ─── Trendings y AboutSection (sin cambios) ───────── */
export function Trendings() {
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
