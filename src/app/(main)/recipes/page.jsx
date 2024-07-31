"use client";
import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "@/app/lib/firebase/clientApp";
import Card from "@/app/components/Recipes/Card";
import Search from "@/app/components/Recipes/Search";
import BreakfastDining from "@mui/icons-material/BreakfastDining";
import LunchDining from "@mui/icons-material/LunchDining";
import DinnerDining from "@mui/icons-material/DinnerDining";
import NaturePeople from "@mui/icons-material/NaturePeople";
import EmojiNature from "@mui/icons-material/EmojiNature";
import Fastfood from "@mui/icons-material/Fastfood";
import Restaurant from "@mui/icons-material/Restaurant";
import LocalDining from "@mui/icons-material/LocalDining";
import Link from "next/link"; // Import Link from next/link

const categories = {
  type: ["Breakfast", "Lunch", "Dinner"],
  dietary: ["Veg", "Non-Veg"],
  cuisine: ["American", "Chinese", "Italian", "Indian"],
};

const getCategoryIcon = (categoryType, item) => {
  switch (categoryType) {
    case "type":
      if (item === "Breakfast") return <BreakfastDining />;
      if (item === "Lunch") return <LunchDining />;
      if (item === "Dinner") return <DinnerDining />;
      break;
    case "dietary":
      if (item === "Veg") return <NaturePeople />;
      if (item === "Non-Veg") return <EmojiNature />;
      break;
    case "cuisine":
      if (item === "American") return <Fastfood />;
      if (item === "Chinese") return <Restaurant />;
      if (item === "Italian") return <LocalDining />;
      if (item === "Indian") return <Restaurant />;
      break;
    default:
      return null;
  }
};

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState({
    type: [],
    dietary: [],
    cuisine: [],
  });

  useEffect(() => {
    // Fetch the recipes from Firestore
    const fetchRecipes = async () => {
      const recipeCollection = collection(db, "recipes");
      const recipeSnapshot = await getDocs(recipeCollection);
      const recipeList = recipeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched recipes:", recipeList); // Log the fetched data
      setRecipes(recipeList);
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    console.log("Recipes state updated:", recipes); // Log the updated state
  }, [recipes]);

  // Filter recipes based on search query and selected categories
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearchQuery = recipe.recipeName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategories = Object.keys(selectedCategories).every(
      (categoryType) => {
        if (selectedCategories[categoryType].length === 0) {
          return true; // No category selected for this type, so match all recipes
        }

        // Check if at least one of the selected categories is present in the recipe
        return selectedCategories[categoryType].some((selectedCategory) =>
          recipe[categoryType]?.includes(selectedCategory)
        );
      }
    );

    return matchesSearchQuery && matchesCategories;
  });

  // Handler for category selection
  const handleCategoryToggle = (categoryType, category) => {
    setSelectedCategories((prev) => {
      const currentSelection = prev[categoryType];
      const newSelection = currentSelection.includes(category)
        ? currentSelection.filter((item) => item !== category)
        : [...currentSelection, category];
      return { ...prev, [categoryType]: newSelection };
    });
  };

  return (
    <div>
      <Search setSearchQuery={setSearchQuery} />
      <div className="p-4 ">
        <div className="flex justify-evenly gap-4">
          {Object.entries(categories).map(([categoryKey, items]) => (
            <div key={categoryKey} className="">
              <h2 className="text-xl font-bold mb-2 capitalize text-orange-500">
                {categoryKey}
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {items.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleCategoryToggle(categoryKey, item)}
                    className={`flex items-center px-4 py-2 rounded-full ${
                      selectedCategories[categoryKey].includes(item)
                        ? "bg-[#FD6A31] text-white"
                        : "bg-gray-50 border   border-orange-500"
                    }`}
                  >
                    {getCategoryIcon(categoryKey, item)}
                    <span className="ml-2">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-24 my-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipe/${recipe.id}`} // Adjust the href to match your routing
              >
                <Card data={recipe} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
