import React from "react";
import { Typography, Card, CardContent, CardMedia, Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KitchenIcon from "@mui/icons-material/Kitchen";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import VegIcon from "@mui/icons-material/EmojiFoodBeverage"; // Replace with actual Veg icon
import NonVegIcon from "@mui/icons-material/Restaurant"; // Replace with actual Non-Veg icon
import BreakfastIcon from "@mui/icons-material/BreakfastDining"; // Placeholder, replace with actual icon
import LunchIcon from "@mui/icons-material/LunchDining"; // Placeholder, replace with actual icon
import DinnerIcon from "@mui/icons-material/DinnerDining"; // Placeholder, replace with actual icon
import AmericanIcon from "@mui/icons-material/Flag"; // Placeholder, replace with actual icon
import ChineseIcon from "@mui/icons-material/Flag"; // Placeholder, replace with actual icon
import ItalianIcon from "@mui/icons-material/Flag"; // Placeholder, replace with actual icon
import IndianIcon from "@mui/icons-material/Flag"; // Placeholder, replace with actual icon

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

const MainCard = ({ recipe, user }) => {
  return (
    <Card className="max-w-6xl mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2">
          <CardMedia
            component="img"
            height="200"
            image={recipe.imageUrl}
            alt={recipe.recipeName}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full sm:w-1/2 p-4">
          <CardContent>
            <div className="flex justify-between">
              <Typography
                variant="h5"
                component="h1"
                className="text-orange-500"
              >
                {recipe.recipeName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Posted by: {user?.name || "Unknown"}
              </Typography>
            </div>

            <div className="flex gap-4 mt-2">
              <div className="flex items-center">
                <LocalDiningIcon className="text-gray-600 mr-1" />
                <Typography variant="body1" color="textSecondary">
                  Servings: {recipe.numServings}
                </Typography>
              </div>
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
              <AccessTimeIcon className="text-gray-600 mr-1" />
              <Typography variant="body1" color="textSecondary">
                Cooking Time: {recipe.cookingTime} minutes
              </Typography>
            </div>
            <div className="flex items-center mt-2">
              <Typography variant="body1" color="textSecondary">
                Cuisine: {recipe.cuisine.join(", ")}
              </Typography>
            </div>
            <div className="flex items-center mt-2">
              {recipe.dietary.map((diet) => (
                <Chip
                  key={diet}
                  icon={dietaryIcons[diet]}
                  label={diet}
                  className="mr-2 mb-2"
                  variant="outlined"
                />
              ))}
            </div>
            <Typography variant="body1" color="textSecondary" className="mt-4">
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
            <Typography variant="body1" color="textSecondary" className="mt-4">
              Directions: {recipe.directions}
            </Typography>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default MainCard;
