"use client";

import React, { useState, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { auth } from "@/app/lib/firebase/clientApp";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/hooks/useAuth";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const router = useRouter();

  const { user } = useAuthContext(); // Ensure this is correctly providing user data

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    console.log("NavBar user from context:", user); // Log user value in NavBar

    // setEmail(user.email);
  }, [user?.displayName]);
  const handleSignOut = () => {
    console.log(user?.email); // Use optional chaining to avoid potential issues
    firebaseSignOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        router.push("/auth");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="p-4 md:mx-24 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex font-semibold text-xl md:text-3xl">
          <p className="text-[#FD6A31]">Recipe</p>
          <span>Hub</span>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#FD6A31]">
            {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>
        <div className="hidden md:flex md:gap-14 font-medium text-base">
          <p className="hover:text-[#FD6A31] cursor-pointer">Home</p>
          <p className="hover:text-[#FD6A31] cursor-pointer">Recipes</p>
          <p className="hover:text-[#FD6A31] cursor-pointer">Share Recipes</p>
        </div>
        <div className="hidden md:block">
          <div className=" flex gap-2">
            <IconButton onClick={handleAvatarClick}>
              <Avatar alt="User Avatar" src="/avatar2.png" />
            </IconButton>
            {user && <p className=" my-auto">{user.displayName}</p>}
          </div>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col mt-4 md:hidden">
          <p className="hover:text-[#FD6A31] cursor-pointer mb-2">Home</p>
          <p className="hover:text-[#FD6A31] cursor-pointer mb-2">Recipes</p>
          <p className="hover:text-[#FD6A31] cursor-pointer mb-4">
            Share Recipes
          </p>
          <div className="flex gap-2">
            <button className="flex items-center bg-[#FD6A31] text-white px-4 py-2 rounded">
              <Avatar
                alt="User Avatar"
                src="/path/to/avatar.jpg"
                className="mr-2"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
