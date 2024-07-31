// src/app/(main)/recipe/[id]/page.jsx
import { doc, getDoc, db } from "@/app/lib/firebase/clientApp";
import MainCard from "@/app/components/Recipes/mainCard";
import { notFound } from "next/navigation";

export default async function RecipePage({ params }) {
  const { id } = params;

  // Fetch recipe data
  const recipeDoc = doc(db, "recipes", id);
  const recipeSnapshot = await getDoc(recipeDoc);
  const recipe = recipeSnapshot.exists() ? recipeSnapshot.data() : null;

  // Fetch user data if recipe exists
  let user = null;
  console.log(user, recipe.userID);
  if (recipe && recipe.userID) {
    const userDoc = doc(db, "users", "LvUClZ5wbsQ12GLdJu5QCsygG1y1");
    const userSnapshot = await getDoc(userDoc);
    user = userSnapshot.exists() ? userSnapshot.data() : null;
  }
  console.log(user, recipe);
  if (!recipe) {
    // If recipe is not found, show a 404 page
    notFound();
  }

  return (
    <div>
      <MainCard recipe={recipe} user={user} />
    </div>
  );
}
