export default function RecipeCard({ recipe }) {
  return (
    <div className="card">
      <h3>{recipe.title}</h3>
      <p><strong>Kategori:</strong> {recipe.category}</p>
      <p><strong>Bahan:</strong> {recipe.ingredients}</p>
      <p><strong>Langkah:</strong> {recipe.steps}</p>
    </div>
  );
}
