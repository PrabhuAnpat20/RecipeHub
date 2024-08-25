import MainCard from "@/app/components/Recipes/MainCard";
import { doc, getDoc, db } from "@/app/lib/firebase/clientApp";

import { notFound } from "next/navigation";

export default async function RecipePage({ params }) {
  const { id } = params;

  // Fetch recipe data
  const recipeDoc = doc(db, "recipes", id);
  const recipeSnapshot = await getDoc(recipeDoc);
  const recipeData = recipeSnapshot.exists() ? recipeSnapshot.data() : null;

  if (!recipeData) {
    // If recipe is not found, show a 404 page
    notFound();
    return null; // to ensure nothing else renders after notFound()
  }

  // Include the document ID in the recipe object
  const recipe = {
    ...recipeData,
    id: recipeSnapshot.id, // Add the document ID
  };

  // Fetch user data if recipe exists
  let user = null;
  if (recipe.userID) {
    try {
      const userDoc = doc(db, "users", recipe.userID);
      const userSnapshot = await getDoc(userDoc);
      user = userSnapshot.exists() ? userSnapshot.data() : null;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <div>
      <MainCard recipe={recipe} User={user} />
    </div>
  );
}
