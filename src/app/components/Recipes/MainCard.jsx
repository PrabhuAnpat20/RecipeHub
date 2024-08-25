"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  IconButton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import BreakfastIcon from "@mui/icons-material/BreakfastDining"; // Placeholder, replace with actual icon
import LunchIcon from "@mui/icons-material/LunchDining"; // Placeholder, replace with actual icon
import DinnerIcon from "@mui/icons-material/DinnerDining"; // Placeholder, replace with actual icon
import AmericanIcon from "@mui/icons-material/Flag"; // Placeholder, replace with actual icon
import ChineseIcon from "@mui/icons-material/Flag"; // Placeholder, replace with actual icon
import ItalianIcon from "@mui/icons-material/Flag"; // Placeholder, replace with actual icon
import IndianIcon from "@mui/icons-material/Flag"; // Placeholder, replace with actual icon
import VegIcon from "@mui/icons-material/EmojiFoodBeverage"; // Replace with actual Veg icon
import NonVegIcon from "@mui/icons-material/Restaurant"; // Replace with actual Non-Veg icon
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toast } from "sonner";
import { orange } from "@mui/material/colors";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase/clientApp"; // Adjust the import based on your project setup
import { useAuthContext } from "@/lib/hooks/useAuth";

const typeIcons = {
  Breakfast: <BreakfastIcon />,
  Lunch: <LunchIcon />,
  Dinner: <DinnerIcon />,
};

const cuisineIcons = {
  American: <AmericanIcon />,
  Chinese: <ChineseIcon />,
  Italian: <ItalianIcon />,
  Indian: <IndianIcon />,
};

const difficultyColors = {
  easy: "bg-green-500 text-white",
  medium: "bg-yellow-500 text-black",
  hard: "bg-red-500 text-white",
};

const dietaryIcons = {
  Veg: <VegIcon />,
  NonVeg: <NonVegIcon />,
};

const MainCard = ({ recipe, User }) => {
  const { user } = useAuthContext();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      if (user) {
        const favoritesDoc = doc(db, "favorites", user.uid);
        const favoritesSnapshot = await getDoc(favoritesDoc);
        if (favoritesSnapshot.exists()) {
          const favoritesData = favoritesSnapshot.data();
          const recipeIDs = favoritesData.recipeIDs || [];
          setIsBookmarked(recipeIDs.includes(recipe.id));
        }
      }
    };

    checkBookmark();
  }, [user, recipe.id]);

  const handleBookmark = async () => {
    const favoritesDoc = doc(db, "favorites", user.uid);
    try {
      if (isBookmarked) {
        await updateDoc(favoritesDoc, {
          recipeIDs: arrayRemove(recipe.id),
        });
        toast.success("Removed from Favorites");
      } else {
        await updateDoc(favoritesDoc, {
          recipeIDs: arrayUnion(recipe.id),
        });
        toast.success("Added to Favorites");
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      toast.error("some error occured");
    }
  };

  return (
    <div className=" bg-slate-50">
      <Card className="  mx-2 md:mx-24 bg-slate-50 border-none shadow-none">
        <div className="flex justify-end p-4">
          {user && (
            <IconButton className="z-10" onClick={handleBookmark}>
              {isBookmarked ? (
                <FavoriteIcon style={{ color: orange[500] }} />
              ) : (
                <FavoriteBorderIcon style={{ color: orange[500] }} />
              )}
            </IconButton>
          )}
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2">
            <CardMedia
              component="img"
              image={recipe.imageUrl}
              alt={recipe.recipeName}
              className="object-cover h-96 "
            />
          </div>
          <div className="w-full sm:w-1/2 p-4">
            <CardContent>
              <div className="flex justify-between">
                <Typography
                  variant="h5"
                  component="h1"
                  className="text-orange-500 font-semibold"
                >
                  {recipe.recipeName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className=" my-auto"
                >
                  Posted by: {User?.name || "Unknown"}
                </Typography>
              </div>

              <div className="flex gap-4 mt-2">
                <div className="flex flex-wrap mt-2">
                  {recipe.type.map((t) => (
                    <Chip
                      key={t}
                      icon={typeIcons[t]}
                      label={t}
                      className="mr-2 mb-2"
                      variant="outlined"
                    />
                  ))}
                </div>
                <div className="flex flex-wrap mt-2">
                  {recipe.cuisine.map((c) => (
                    <Chip
                      key={c}
                      icon={cuisineIcons[c]}
                      label={c}
                      className="mr-2 mb-2"
                      variant="outlined"
                    />
                  ))}
                </div>
              </div>
              <div className=" flex gap-4">
                <div className="flex items-center mt-2">
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    className={`p-1 rounded ${
                      difficultyColors[recipe.difficulty.toLowerCase()]
                    }`}
                  >
                    Difficulty: {recipe.difficulty}
                  </Typography>
                </div>
                <div className="flex items-center mt-2">
                  {recipe.dietary.map((diet) => (
                    <img src={`/${diet}.png`} alt="" className=" w-8" />
                  ))}
                </div>
              </div>
              <div className="flex items-center my-2">
                <LocalDiningIcon className="text-gray-600 mr-1" />
                <Typography variant="body1" color="textSecondary">
                  Servings: {recipe.numServings}
                </Typography>
              </div>
              <div className="flex items-center mt-2">
                <AccessTimeIcon className="text-gray-600 mr-1" />
                <Typography variant="body1" color="textSecondary">
                  Cooking Time: {recipe.cookingTime} minutes
                </Typography>
              </div>

              <Typography
                variant="body1"
                color="textSecondary"
                className="mt-4"
              >
                Ingredients
              </Typography>
              <div className="flex flex-wrap mt-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <Chip
                    key={index}
                    label={ingredient}
                    className="mr-2 mb-2"
                    variant="outlined"
                  />
                ))}
              </div>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mt-4"
              >
                Directions: {recipe.directions}
              </Typography>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MainCard;
