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
  if (recipe && recipe.userID) {
    try {
      const userDoc = doc(db, "users", recipe.userID);
      const userSnapshot = await getDoc(userDoc);
      user = userSnapshot.exists() ? userSnapshot.data() : null;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

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
