"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import {
  IconChevronDown,
  IconHeart,
  IconPerfume,
  IconSofa,
  IconBasket,
  IconApps,
} from "@tabler/icons-react";
import useSWR from "swr";

export default function Product_Page() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const router = useRouter();

  const { data: productsData, error, isLoading } = useSWR(
    "https://dummyjson.com/products",
    fetcher
  );

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: product.id,
      fullname: product.title,
      email: `Brand: ${product.brand}`,
      role: product.category,
      status: `Rp${product.price.toLocaleString("id-ID")} • ${product.rating}`,
      image: product.thumbnail,
      qty: 1,
    };

    const updatedCart = [...cart, newItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    router.push("/admin/product/checkout");
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Gagal memuat data</p>
      </div>
    );
  }

  const categoryTabs = [
    { key: "all", label: "Semua", icon: IconApps },
    { key: "beauty", label: "Beauty", icon: IconHeart },
    { key: "fragrances", label: "Fragrances", icon: IconPerfume },
    { key: "furniture", label: "Furniture", icon: IconSofa },
    { key: "groceries", label: "Groceries", icon: IconBasket },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? productsData.products
      : productsData.products.filter(
        (product) => product.category === selectedCategory
      );

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Cari Produk"
          className="flex-1 border border-gray-300 rounded-md p-2 min-w-[200px]"
        />

        <div className="relative">
          <button
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            className="flex items-center gap-1 border px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            <IconChevronDown size={18} />
            <span className="text-sm">Filter Kategori</span>
          </button>

          {showCategoryMenu && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10 w-40">
              {categoryTabs.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                      setShowCategoryMenu(false);
                    }}
                    className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 ${selectedCategory === cat.key
                      ? "bg-gray-200 font-semibold"
                      : ""
                      }`}
                  >
                    <Icon size={18} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        {filteredProducts.map((product) => (
          <ProductCard
            key={`product-${product.id}`}
            fullname={product.title}
            email={`Brand: ${product.brand}`}
            role={product.category}
            status={`Rp${product.price.toLocaleString("id-ID")} • ${product.rating}`}
            image={product.thumbnail}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}
