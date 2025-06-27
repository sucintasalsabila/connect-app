"use client";
import { useState } from "react";

export default function RecipeForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    servings: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ title: "", ingredients: "", servings: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow mb-4">
      <input
        name="title"
        placeholder="Judul Resep"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-2"
      />
      <textarea
        name="ingredients"
        placeholder="Bahan-bahan"
        value={form.ingredients}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-2"
      />
      <input
        name="servings"
        placeholder="Porsi"
        value={form.servings}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Simpan Resep
      </button>
    </form>
  );
}
