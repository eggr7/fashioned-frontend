export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center"
    >
      <h1 className="text-5xl md:text-7xl font-bold italic mb-8">FashionED</h1>
      <div className="space-x-4">
        <a href="#products" className="px-6 py-3 bg-indigo-600 text-white rounded hover:shadow-lg hover:scale-105 transition">
          Browse Products
        </a>
        <a href="#about" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:shadow-lg hover:scale-105 transition">
          Learn More
        </a>
      </div>
    </section>
  );
}
