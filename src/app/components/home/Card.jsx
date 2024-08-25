"use client";
import { useState, useEffect } from "react";
import React from "react";
import { FaShareAlt, FaBookOpen, FaArrowRight } from "react-icons/fa";
import { db, collection, getDocs } from "@/app/lib/firebase/clientApp";
import { query, orderBy, limit } from "firebase/firestore";
import Card from "./Recipe";
import Link from "next/link";

function HomeCard() {
  const iconStyle = { color: "#FD6A31", fontSize: "1.5rem" };
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const q = query(
        collection(db, "recipes"),
        orderBy("createdAt", "desc"),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      const recipesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecipes(recipesData);
    };

    fetchRecipes();
  }, []);

  return (
    <div className="mt-3 md:mt-0 text-center md:text-left">
      <p className="md:text-4xl text-2xl font-medium my-3">Let's Cook Now...</p>
      <p className="text-base text-slate-600 my-2 md:text-lg">
        Make your family happy with the dishes you make. With us, cooking just
        got easier.
      </p>
      <div className="flex gap-5 mt-8 justify-center md:justify-normal text-sm md:text-base">
        <div className="flex items-center gap-2">
          <FaShareAlt style={iconStyle} />
          <p>Share Recipes</p>
        </div>
        <div className="flex items-center gap-2">
          <FaBookOpen style={iconStyle} />
          <p>Get Recipes</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
        {recipes.map((recipe) => (
          <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
            <Card data={recipe} key={recipe.id} />
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center md:justify-end gap-2 mx-2 my-2 cursor-pointer">
        <Link href="/recipes">
          <div className="flex gap-2">
            <p className="hover:text-orange-500">Explore more</p>
            <FaArrowRight style={iconStyle} />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomeCard;
