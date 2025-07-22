"use client";
import Image from "next/image";

/* ─── Types ────────────────────────────────────────── */
export interface Product {
  name: string;
  price: number;
  category?: { name: string } | null;
  sizes: { label: string }[];
  colors: { name: string; hexCode: string }[];
  images: { url: string }[];
}

/* Base URL for remotes assets from Strapi*/
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  /* Main image (absolute) */
  const mainImg = product.images[0]?.url
    ? product.images[0].url.startsWith("http")
      ? product.images[0].url
      : `${API_URL}${product.images[0].url}`
    : "/placeholder.png";

  return (
    <article className="border rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative w-full h-44">
        <Image
          src={mainImg}
          alt={`${product.name} image`}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          placeholder="empty"
        />
      </div>

      {/* Details */}
      <div className="p-4 grow flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">
            Category: {product.category?.name ?? "N/A"}
          </p>
        </div>

        {/* Sizes */}
        {product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-2 my-2">
            {product.sizes.map((s, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 border rounded-full text-gray-600 dark:text-gray-300"
              >
                {s.label}
              </span>
            ))}
          </div>
        )}

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            {product.colors.map((c, idx) => (
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
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  );
}
