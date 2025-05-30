import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

import westernFashion from "../assets/Western_Fashion _Festival.webp";
import vintageFashion from "../assets/Vintage_Fashion_Show.webp";
import summerFashion from "../assets/Summer_Fashion_Show.webp";
import runwayShow from "../assets/Runway_Show.webp";

type Product = {
  id: number;
  title: string;
  image: string;
  category: string;
};

type ProductListProps = {
  variant?: "compact" | "grid";
  showAllButton?: boolean;
};

const products: Product[] = [
  {
    id: 1,
    title: "Western Fashion Festival",
    image: westernFashion,
    category: "Festival",
  },
  {
    id: 2,
    title: "Vintage Fashion Show",
    image: vintageFashion,
    category: "Vintage",
  },
  {
    id: 3,
    title: "Summer Fashion Show",
    image: summerFashion,
    category: "Summer",
  },
  { id: 4, title: "Runway Show", image: runwayShow, category: "Runway" },
  {
    id: 5,
    title: "Extra Fashion 1",
    image: westernFashion,
    category: "Runway",
  },
  {
    id: 6,
    title: "Extra Fashion 2",
    image: summerFashion,
    category: "Festival",
  },
  {
    id: 7,
    title: "Extra Fashion 3",
    image: summerFashion,
    category: "Festival",
  },
];

export default function ProductList({
  variant = "compact",
  showAllButton = true,
}: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const categories = ["Tümü", "Festival", "Vintage", "Summer", "Runway"];

  const filtered =
    selectedCategory === "Tümü"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const compactView = variant === "compact";
  const visibleProducts = compactView ? filtered.slice(0, 4) : paginated;

  const gridClass = compactView
    ? "grid-cols-2 sm:grid-cols-4"
    : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-2";

  return (
    <section className="px-4 sm:px-6 md:px-10 py-16 bg-white">
      <h2 className="text-4xl sm:text-5xl font-fancy text-center mb-10">
        Two Cowboys Production
      </h2>

      {/* Kategori Filtreleri */}
      {!compactView && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border transition font-medium ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "border-black text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Ürün Grid */}
      <div className="overflow-x-visible">
        <div className={`grid gap-6 w-full ${gridClass}`}>
          {visibleProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              variant={variant}
            />
          ))}
        </div>
      </div>

      {/* Sayfalandırma */}
      {!compactView && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full border text-sm transition ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "border-black text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Compact modda tümünü gör */}
      {compactView && showAllButton && (
        <div className="text-center mt-12">
          <Link
            to="/production"
            className="inline-block px-8 py-3 bg-gradient-to-r from-black to-neutral-800 text-white rounded-xl shadow hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Tüm Prodüksiyonları Gör
          </Link>
        </div>
      )}
    </section>
  );
}
