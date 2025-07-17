"use client";

import { useQuery } from "@apollo/client";
import client from "@/lib/apollo";
import { GET_PRODUCTS } from "@/lib/queries";

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

export default function Home() {
  const { data, loading, error } = useQuery<ProductsData>(GET_PRODUCTS, { client });

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error.message}</p>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">T-shirts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.products?.map((product: Product, i: number) => (
          <div
            key={i}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            {product.images?.[0]?.url && (
              <img
                src={`http://localhost:1337${product.images[0].url}`}
                alt={product.name}
                className="mb-4 w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500">
              Category: {product.category?.name}
            </p>
            <p className="text-sm text-gray-500">
              Sizes: {product.sizes.map((s: Size) => s.label).join(", ")}
            </p>
            <div className="flex gap-2 mt-2">
              {product.colors.map((c: Color, idx: number) => (
                <div
                  key={idx}
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: c.hexCode }}
                  title={c.name}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
