"use client";

import UserCard from "@/components/ui/user-card";
import { IconPlus, IconMassage } from "@tabler/icons-react";
import useSWR from "swr";

export default function Recipes_Page() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const {
    data: recipesData,
    error,
    isLoading,
  } = useSWR("https://dummyjson.com/recipes", fetcher);

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
        placeholder="Daftar resep"
        aria-label="Daftar resep"
        className="w-full border border-gray-300 rounded-md p-2 mb-6"
      />
      <div className="flex flex-col gap-4">
        {recipesData?.recipes?.map((recipes) => (
          <UserCard
            key={recipes.name}
            fullname={recipes.name}
            email={recipes.ingredients}
            status={recipes.servings}
          />
        ))}
      </div>
    </div>
  );
}
