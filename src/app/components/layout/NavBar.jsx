"use client";

import React, { useState, useEffect } from "react";
import { MdMenu, MdClose, MdExitToApp, MdDashboard } from "react-icons/md"; // Import icons
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { auth } from "@/app/lib/firebase/clientApp";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/hooks/useAuth";
import Link from "next/link";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const router = useRouter();

  const { user } = useAuthContext();

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
    console.log("NavBar user from context:", user);
  }, [user?.displayName]);

  const handleSignOut = () => {
    console.log(user?.email);
    firebaseSignOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        router.push("/auth");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const isActive = (path) =>
    router.asPath === path ? "text-[#FD6A31] underline" : "";

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
          <Link href="/">
            <p
              className={`hover:text-[#FD6A31] cursor-pointer ${isActive("/")}`}
            >
              Home
            </p>
          </Link>
          <Link href="/recipes">
            <p
              className={`hover:text-[#FD6A31] cursor-pointer ${isActive(
                "/recipes"
              )}`}
            >
              Recipes
            </p>
          </Link>
          <Link href="/post">
            <p
              className={`hover:text-[#FD6A31] cursor-pointer ${isActive(
                "/post"
              )}`}
            >
              Share Recipes
            </p>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="flex gap-2">
            <IconButton onClick={handleAvatarClick}>
              <Avatar alt="User Avatar" src="/avatar2.png" />
            </IconButton>
            {user && <p className="my-auto">{user.displayName}</p>}
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
            <Link href="/profile">
              <MenuItem onClick={handleMenuClose}>
                <MdDashboard className="text-[#FD6A31] mr-2" />{" "}
                {/* Dashboard icon */}
                Dashboard
              </MenuItem>
            </Link>

            <MenuItem onClick={handleSignOut}>
              <MdExitToApp className="text-red-500 mr-2" />{" "}
              {/* Red logout icon */}
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col text-center gap-y-2 mt-4 md:hidden border-t border-orange-500">
          <Link href="/">
            <p
              className={`hover:text-[#FD6A31] cursor-pointer mt-2 ${isActive(
                "/"
              )}`}
            >
              Home
            </p>
          </Link>
          <Link href="/recipes">
            <p
              className={`hover:text-[#FD6A31] cursor-pointer ${isActive(
                "/recipes"
              )}`}
            >
              Recipes
            </p>
          </Link>
          <Link href="/post">
            <p
              className={`hover:text-[#FD6A31] cursor-pointer ${isActive(
                "/post"
              )}`}
            >
              Share Recipes
            </p>
          </Link>
          <Link href="/profile">
            <p
              className={`hover:text-[#FD6A31] cursor-pointer ${isActive(
                "/profile"
              )}`}
            >
              Dashboard
            </p>
          </Link>
          <div className="flex gap-2 text-center justify-center">
            <MdExitToApp className="text-red-500 mr-2 my-auto" />
            <div onClick={handleSignOut}>Logout</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
