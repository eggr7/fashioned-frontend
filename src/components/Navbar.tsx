"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-20 backdrop-blur bg-white/70 dark:bg-black/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="#hero" className="text-2xl font-semibold italic text-gray-900 dark:text-gray-100">
          FashionED
        </Link>
        <div className="flex items-center gap-6">
          <Link href="#products" className="text-gray-800 dark:text-gray-200 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            All Products
          </Link>
          <Link href="#trending" className="text-gray-800 dark:text-gray-200 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Trendings
          </Link>
          <Link href="#about" className="text-gray-800 dark:text-gray-200 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            About Section
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
