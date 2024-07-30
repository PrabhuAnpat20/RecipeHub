"use client";
import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="p-4 md:mx-24 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex font-semibold text-xl md:text-2xl">
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
          <IconButton onClick={handleAvatarClick}>
            <Avatar alt="User Avatar" src="/avatar2.png" />
          </IconButton>
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
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
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
          <button className="flex items-center bg-[#FD6A31] text-white px-4 py-2 rounded">
            <Avatar
              alt="User Avatar"
              src="/path/to/avatar.jpg"
              className="mr-2"
            />
            <span>Profile</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
