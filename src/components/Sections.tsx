"use client";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import client from "@/lib/apollo";
import { GET_PRODUCTS } from "@/lib/queries";

/* ─── Tipos locales ────────────────────────────────────────────── */
interface ProductsData {
  products: {
    name: string;
    price: number;
    category?: { name: string } | null;
    sizes: { label: string }[];
    colors: { name: string; hexCode: string }[];
    images: { url: string }[];
  }[];
}

/* URL base para assets remotos de Strapi */
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

/* ─── AllProducts ─────────────────────────────────────────────── */
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
          {data.products.map((p, i) => {
            /* Construye URL absoluta si Strapi devuelve ruta relativa */
            const mainImg = p.images[0]?.url
              ? p.images[0].url.startsWith("http")
                ? p.images[0].url
                : `${API_URL}${p.images[0].url}`
              : "/placeholder.png";

            return (
              <article
                key={`${p.name}-${i}`}
                className="border rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col"
              >
                {/* Imagen optimizada */}
                <div className="relative w-full h-44">
                  <Image
                    src={mainImg}
                    alt={`${p.name} image`}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    placeholder="empty"
                  />
                </div>

                {/* Detalles */}
                <div className="p-4 grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Category: {p.category?.name ?? "N/A"}
                    </p>
                  </div>

                  {/* Tallas */}
                  {p.sizes.length > 0 && (
                    <div className="flex flex-wrap gap-2 my-2">
                      {p.sizes.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 border rounded-full text-gray-600 dark:text-gray-300"
                        >
                          {s.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Colores */}
                  {p.colors.length > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      {p.colors.map((c, idx) => (
                        <div
                          key={idx}
                          title={c.name}
                          style={{ backgroundColor: c.hexCode }}
                          className="w-4 h-4 rounded-full border border-gray-300"
                        />
                      ))}
                    </div>
                  )}

                  <p className="font-medium text-indigo-600 dark:text-indigo-400">
                    ${p.price.toFixed(2)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Caso sin productos */}
      {!loading && !error && data?.products.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}
    </section>
  );
}

/* ─── Trendings y AboutSection (sin cambios) ───────────────────── */
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
