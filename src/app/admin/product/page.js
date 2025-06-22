"use client";

import UserCard from "@/components/ui/user-card";
import { IconPlus, IconBrandProducthunt } from "@tabler/icons-react";
import useSWR from "swr";

export default function Product_Page() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const {
    data: productsData,
    error,
    isLoading,
  } = useSWR("https://dummyjson.com/products", fetcher);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Gagal memuat data</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Cari Produk"
        aria-label="Cari Produk"
        className="w-full border border-gray-300 rounded-md p-2 mb-6"
      />

      <div className="flex flex-col gap-4">
        {productsData.products.map((product) => (
          <UserCard
            key={product.id}
            fullname={product.title}       
            email={product.brand}          
            role={product.category}        
            status={product.description}   
          />
        ))}
      </div>
      </div>
  );
}
