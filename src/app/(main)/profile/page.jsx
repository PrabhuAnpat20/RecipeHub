"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/lib/hooks/useAuth";
import {
  db,
  collection,
  getDocs,
  doc,
  getDoc,
} from "@/app/lib/firebase/clientApp";
import Card from "@/app/components/Recipes/Card";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    if (user) {
      fetchBookmarkedRecipes();
      fetchUserRecipes();
    }
  }, [user]);

  const fetchBookmarkedRecipes = async () => {
    try {
      const favRef = doc(db, "favorites", user.uid);
      const favDoc = await getDoc(favRef);
      if (favDoc.exists()) {
        let recipeIds = favDoc.data().recipeIDs;
        if (!Array.isArray(recipeIds)) {
          recipeIds = recipeIds ? [recipeIds] : [];
        }

        console.log("Bookmarked Recipe IDs:", recipeIds);

        const recipes = await Promise.all(
          recipeIds.map(async (id) => {
            try {
              const recipeRef = doc(db, "recipes", id);
              const recipeDoc = await getDoc(recipeRef);
              if (recipeDoc.exists()) {
                const recipeData = { id: recipeDoc.id, ...recipeDoc.data() };
                console.log("Fetched Recipe Data:", recipeData);
                return recipeData;
              } else {
                console.warn(`No recipe found for ID: ${id}`);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching recipe with ID ${id}:`, error);
              return null;
            }
          })
        );

        const validRecipes = recipes.filter((recipe) => recipe !== null);
        setBookmarkedRecipes(validRecipes);
        console.log("Bookmarked Recipes:", validRecipes);
      }
    } catch (error) {
      console.error("Error fetching bookmarked recipes:", error);
    }
  };

  const fetchUserRecipes = async () => {
    try {
      const recipesRef = collection(db, "recipes");
      const querySnapshot = await getDocs(recipesRef);
      const userRecipes = querySnapshot.docs
        .filter((doc) => doc.data().userID === user.uid)
        .map((doc) => {
          const recipeData = { id: doc.id, ...doc.data() };
          console.log("User Recipe Data:", recipeData);
          return recipeData;
        });
      setUserRecipes(userRecipes);
      console.log("User Recipes:", userRecipes);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    }
  };

  return (
    <div className="">
      <div className="relative w-full  h-48 md:h-80 bg-orange-500 text-white flex items-center justify-center">
        <div className="absolute inset-0 "></div>
        <div className="relative z-10 text-center">
          <h1 className=" text-4xl md:text-5xl font-bold">
            Welcome to Your Dashboard
          </h1>
          <p className=" text-sm md:text-lg mt-2">
            Manage your recipes and discover new favorites!
          </p>
        </div>
      </div>

      <div className="mt-8 mx-2 md:mx-24">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FavoriteIcon style={{ color: "#FD6A31", marginRight: "8px" }} />
          Your Favorites
        </h2>
        {bookmarkedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarkedRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
                <Card data={recipe} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600  text-center">
            No bookmarked recipes found.
          </p>
        )}
      </div>

      <div className="mt-8 mx-2 md:mx-24">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <MenuBookIcon style={{ color: "#FD6A31", marginRight: "8px" }} />
          Your Recipes
        </h2>
        {userRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
                <Card data={recipe} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No recipes found.</p>
        )}
      </div>
    </div>
  );
}
