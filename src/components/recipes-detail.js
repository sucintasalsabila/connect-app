export default function RecipeDetailCard({ recipe }) {
  return (
    <div className="p-6 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
      <p className="text-gray-600 mb-2">
        <strong>Jumlah Porsi:</strong> {recipe.servings}
      </p>
      <p className="mb-4">
        <strong>Bahan-bahan:</strong> {recipe.ingredients}
      </p>
      <div>
        <strong>Langkah-langkah:</strong>
        <ul className="list-disc list-inside mt-2">
          {recipe.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
