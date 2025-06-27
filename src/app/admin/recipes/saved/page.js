"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserCard from "@/components/ui/user-card";
import { IconBookmark } from "@tabler/icons-react";

export default function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const allRecipes = JSON.parse(localStorage.getItem("recipesData")) || [];
    const filtered = allRecipes.filter((r) => savedIds.includes(r.id));
    setSavedRecipes(filtered);
  }, []);

  if (savedRecipes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <IconBookmark size={48} className="mx-auto text-gray-400 mb-2" />
        <p className="text-lg text-gray-600">Tidak ada resep yang disimpan.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex items-center gap-2 mb-4">
        <IconBookmark size={28} className="text-green-600" />
        <h1 className="text-2xl font-semibold">Resep yang Disimpan</h1>
      </div>
      <div className="flex flex-col gap-4">
        {savedRecipes.map((r) => (
          <Link key={r.id} href={`/admin/recipes/${r.id}`} className="block">
            <UserCard
              fullname={r.name || r.title}
              email={r.ingredients}
              status={r.servings || "-"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
