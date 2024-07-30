import React from "react";
import {
  FaShareAlt,
  FaBookOpen,
  FaUtensils,
  FaArrowRight,
} from "react-icons/fa";

function Card() {
  const iconStyle = { color: "#FD6A31", fontSize: "1.5rem" };

  return (
    <div className=" mt-3 md:mt-0 text-center md:text-left ">
      <p className="md:text-4xl text-2xl font-medium my-3">Lets Cook Now...</p>
      <p className=" text-base text-slate-600 my-2 md:text-lg ">
        Make your family happy with the dishes you make. With us, cooking just
        got easier.
      </p>
      <div className="flex gap-5 mt-8   justify-center md:justify-normal  text-sm md:text-base">
        <div className="flex items-center gap-2">
          <FaShareAlt style={iconStyle} />
          <p>Share Recipes</p>
        </div>
        <div className="flex items-center gap-2">
          <FaBookOpen style={iconStyle} />
          <p>Get Recipes</p>
        </div>
        <div className="flex items-center gap-2">
          <p>Explore</p>
          <FaArrowRight style={iconStyle} />
        </div>
      </div>
    </div>
  );
}

export default Card;
