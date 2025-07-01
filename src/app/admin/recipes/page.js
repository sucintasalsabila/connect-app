"use client";

import UserCard from "@/components/ui/user-card";
import { IconPlus, IconTrash, IconHeart, IconBookmark, IconEye, IconRefresh } from "@tabler/icons-react";
import useSWR from "swr";
import Link from "next/link";
import { useState, useEffect } from "react";
import RecipeForm from "@/components/RecipeForm";
import { recipesMock } from "@/mock/data-recipes";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Recipes_Page() {
  const { data, error, isLoading } = useSWR("https://dummyjson.com/recipes", fetcher);
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [originalRecipes, setOriginalRecipes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("recipesData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setRecipes(parsed);
      setOriginalRecipes(parsed);
      return;
    }

    if (data?.recipes) {
      const withLikes = data.recipes.map((r) => ({
        ...r,
        likes: r.likes ?? 0,
      }));
      setRecipes(withLikes);
      setOriginalRecipes(withLikes);
    } else if (!isLoading && !error) {
      const mockWithLikes = recipesMock.map((r) => ({ ...r, likes: r.likes ?? 0 }));
      setRecipes(mockWithLikes);
      setOriginalRecipes(mockWithLikes);
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem("recipesData", JSON.stringify(recipes));
    }
  }, [recipes]);

  useEffect(() => {
    const saved = localStorage.getItem("savedRecipes");
    if (saved) {
      setSavedRecipeIds(JSON.parse(saved));
    }
  }, []);

  const handleAddRecipe = (newRecipe) => {
    const recipeWithId = {
      ...newRecipe,
      id: Date.now(),
      likes: 0,
    };
    const updated = [...recipes, recipeWithId];
    setRecipes(updated);
    setOriginalRecipes(updated);
    setShowForm(false);
  };

  const handleLike = (id) => {
    const updated = recipes.map((r) =>
      r.id === id ? { ...r, likes: r.likes + 1 } : r
    );
    setRecipes(updated);
    setOriginalRecipes(updated);
  };

  const handleToggleSave = (id) => {
    let updated;
    if (savedRecipeIds.includes(id)) {
      updated = savedRecipeIds.filter((rid) => rid !== id);
    } else {
      updated = [...savedRecipeIds, id];
    }
    setSavedRecipeIds(updated);
    localStorage.setItem("savedRecipes", JSON.stringify(updated));
  };

  const handleDeleteRecipe = (id) => {
    const updated = recipes.filter((r) => r.id !== id);
    setRecipes(updated);
    setOriginalRecipes(updated);

    const newSaved = savedRecipeIds.filter((rid) => rid !== id);
    setSavedRecipeIds(newSaved);
    localStorage.setItem("savedRecipes", JSON.stringify(newSaved));
  };

  const handleShowAll = () => {
    setRecipes(originalRecipes);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Gagal memuat data</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Cari Resep"
          aria-label="Cari Resep"
          className="flex-1 border border-gray-300 rounded-md p-2 min-w-[200px]"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 border px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
        >
          <IconPlus size={20} />
          Tambah Resep
        </button>
      </div>

      <div className="flex gap-4 mb-4 items-center">
        <Link
          href="/admin/recipes/saved"
          className="text-sm text-green-700 hover:underline flex items-center gap-1"
        >
          <IconBookmark size={16} /> Lihat Resep Disimpan
        </Link>
        <button
          onClick={handleShowAll}
          className="text-sm text-gray-600 hover:underline flex items-center gap-1"
        >
          <IconRefresh size={16} /> Tampilkan Semua
        </button>
      </div>

      {showForm && <RecipeForm onAdd={handleAddRecipe} />}

      <div className="flex flex-col gap-4 mt-4">
        {recipes.map((r) => (
          <Link key={r.id} href={`/admin/recipes/${r.id}`} className="block">
            <div>
              <UserCard
                fullname={r.name || r.title}
                email={r.ingredients}
                status={r.servings || "-"}
              />
              <div className="flex gap-4 mt-2 text-sm">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLike(r.id);
                  }}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <IconHeart size={16} /> {r.likes}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleSave(r.id);
                  }}
                  className={`flex items-center gap-1 ${savedRecipeIds.includes(r.id)
                    ? "text-green-600"
                    : "text-gray-400"
                    } hover:text-green-800`}
                >
                  <IconBookmark size={16} /> {savedRecipeIds.includes(r.id) ? "Disimpan" : "Simpan"}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteRecipe(r.id);
                  }}
                  className="text-gray-500 hover:text-red-600 flex items-center gap-1"
                >
                  <IconTrash size={16} /> Hapus
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
