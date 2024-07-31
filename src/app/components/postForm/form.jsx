"use client";
import React, { useState } from "react";
import {
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Chip,
  IconButton,
} from "@mui/material";
import { useAuthContext } from "@/lib/hooks/useAuth";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import Upload from "@mui/icons-material/Upload";
import Close from "@mui/icons-material/Close";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import BreakfastDining from "@mui/icons-material/BreakfastDining";
import LunchDining from "@mui/icons-material/LunchDining";
import DinnerDining from "@mui/icons-material/DinnerDining";
import LocalDining from "@mui/icons-material/LocalDining";
import Restaurant from "@mui/icons-material/Restaurant";
import Fastfood from "@mui/icons-material/Fastfood";
import NaturePeople from "@mui/icons-material/NaturePeople";
import EmojiNature from "@mui/icons-material/EmojiNature";
import { db, collection, addDoc, storage } from "@/app/lib/firebase/clientApp";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const categories = {
  type: ["Breakfast", "Lunch", "Dinner"],
  dietary: ["Veg", "Non-Veg"],
  cuisine: ["American", "Chinese", "Italian", "Indian"],
};

const RecipeForm = () => {
  const [selectedType, setSelectedType] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numServings, setNumServings] = useState("");
  const [directions, setDirections] = useState("");
  const { user } = useAuthContext();

  const handleSelectCategory = (setCategory, value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const getCategoryIcon = (category, item) => {
    switch (category) {
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

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    } else {
      toast.error("Only images allowed");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleImageClick = () => {
    document.getElementById("file-input").click();
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImageFile(null);
  };

  const uploadImageToFirebase = async (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImageToFirebase(imageFile);
      }

      await addDoc(collection(db, "recipes"), {
        userID: user.uid,
        recipeName,
        cookingTime,
        difficulty,
        numServings,
        type: selectedType,
        dietary: selectedDietary,
        cuisine: selectedCuisine,
        ingredients,
        directions,
        imageUrl, // Use imageUrl from Firebase Storage
        createdAt: new Date(),
      });
      console.log(imageUrl, recipeName);
      toast.success("Recipe submitted successfully!");
      // Clear form after submission
      setRecipeName("");
      setCookingTime("");
      setDifficulty("");
      setNumServings("");
      setDirections("");
      setSelectedType([]);
      setSelectedDietary([]);
      setSelectedCuisine([]);
      setIngredients([]);
      setSelectedImage(null);
      setImageFile(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit recipe. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg md:mx-24 my-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <TextField
            fullWidth
            label="Recipe Name"
            variant="outlined"
            required
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#FD6A31",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FD6A31",
              },
            }}
          />
          <TextField
            fullWidth
            label="Cooking Time (e.g., 45 mins)"
            variant="outlined"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#FD6A31",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FD6A31",
              },
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-evenly mb-4">
          {Object.entries(categories).map(([categoryKey, items]) => (
            <div key={categoryKey} className="flex flex-col">
              <p className="font-semibold mb-2 capitalize">{categoryKey}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip
                    key={item}
                    icon={getCategoryIcon(categoryKey, item)}
                    label={item}
                    clickable
                    className={`cursor-pointer rounded-xl px-1 ${
                      (categoryKey === "type" && selectedType.includes(item)) ||
                      (categoryKey === "dietary" &&
                        selectedDietary.includes(item)) ||
                      (categoryKey === "cuisine" &&
                        selectedCuisine.includes(item))
                        ? "bg-[#FD6A31] text-white"
                        : "bg-gray-100 text-black"
                    }`}
                    sx={{
                      "&:hover, &:focus": {
                        backgroundColor: "#FD6A31",
                        color: "white",
                        "& .MuiChip-icon": {
                          color: "white",
                        },
                      },
                      "& .MuiChip-icon": {
                        color:
                          (categoryKey === "type" &&
                            selectedType.includes(item)) ||
                          (categoryKey === "dietary" &&
                            selectedDietary.includes(item)) ||
                          (categoryKey === "cuisine" &&
                            selectedCuisine.includes(item))
                            ? "white"
                            : "#FD6A31",
                      },
                    }}
                    onClick={() =>
                      categoryKey === "type"
                        ? handleSelectCategory(setSelectedType, item)
                        : categoryKey === "dietary"
                        ? handleSelectCategory(setSelectedDietary, item)
                        : handleSelectCategory(setSelectedCuisine, item)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <FormControl fullWidth>
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              label="Difficulty"
              required
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FD6A31",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FD6A31",
                },
              }}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="No. of Servings (e.g., 4)"
            variant="outlined"
            value={numServings}
            onChange={(e) => setNumServings(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#FD6A31",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FD6A31",
              },
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          <TextField
            fullWidth
            label="Add Ingredient"
            variant="outlined"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#FD6A31",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FD6A31",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddIngredient}
            className="bg-orange-500 hover:bg-orange-700"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {ingredients.map((ingredient, index) => (
            <Chip
              key={index}
              label={ingredient}
              onDelete={() => handleRemoveIngredient(index)}
              deleteIcon={<Close />}
              sx={{
                backgroundColor: "#FD6A31",
                color: "white",
                "& .MuiChip-deleteIcon": {
                  color: "white",
                },
              }}
            />
          ))}
        </div>

        <TextField
          fullWidth
          multiline
          rows={6}
          label="Directions"
          variant="outlined"
          value={directions}
          onChange={(e) => setDirections(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#FD6A31",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FD6A31",
            },
          }}
        />

        <div className="flex flex-col mb-4">
          <div
            {...getRootProps()}
            className="cursor-pointer text-[#FD6A31] border border-gray-300 rounded-lg p-3 flex items-center"
            onClick={handleImageClick}
          >
            <input
              id="file-input"
              type="file"
              {...getInputProps()}
              style={{ display: "none" }}
            />
            <div className="w-1/2 min-h-[250px] flex flex-col items-center mx-auto justify-center border-4 border-dashed border-gray-600 rounded-[7px]">
              {!selectedImage ? (
                <div className="text-center">
                  <img
                    src="/image-regular.svg"
                    alt="Upload"
                    width="70px"
                    className="mx-auto"
                  />
                  <span className="mt-3 p-2 text-black text-xl">
                    Drag & Drop your images here
                  </span>
                  <span className="text-gray-500 text-md">
                    or <u className="cursor-pointer text-black">browse</u> from
                    gallery
                  </span>
                </div>
              ) : (
                <div className="relative mt-4">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="rounded-lg max-w-full h-auto"
                  />
                  <IconButton
                    className="absolute top-[-22px] right-[-20px] text-red-600 p-3"
                    onClick={handleImageRemove}
                    size="large"
                  >
                    <RemoveCircle />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" flex md:justify-end">
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#FD6A31" }}
            className=""
          >
            Submit Recipe
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
