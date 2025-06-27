"use client";
import RecipeDetailCard from "@/components/recipes-detail";
import { useParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function RecipeDetailPage() {
  const { id } = useParams();

  const {
    data: recipe,
    error,
    isLoading,
  } = useSWR(`https://dummyjson.com/recipes/${id}`, fetcher);
  
if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Gagal memuat data</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <RecipeDetailCard recipe={recipe} />
    </div>
  );
} 