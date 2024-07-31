import React from "react";
import Image from "next/image";

function Banner() {
  return (
    <div className=" bg-slate-50 text-center md:text-left">
      <div className="md:flex md:pt-0 pt-4 items-center justify-between p-4  mx-3 md:mx-24  gap-20">
        <div className="flex-1  ">
          <p className=" font-semibold    text-2xl md:text-5xl mb-2">
            From Kitchen to Community: Share Your Best Recipes and Explore New
            Favorites!
          </p>
          <p className="text-slate-400 my-2">
            Craft Delicious Meals and Share Your Culinary Magic with Others
          </p>
          <div className="flex  my-6  md:mr-16  md:w-96  text-sm md:text-base mx-auto  md:mx-0 ">
            <input
              type="text"
              placeholder="Type your favorite recipe here"
              className="flex-1 p-2 border border-gray-300 rounded-l-md "
            />
            <button className="bg-[#FD6A31] text-white p-2  rounded-r-md hover:bg-[#e55d22] transition-colors">
              Search
            </button>
          </div>
        </div>
        <div className="flex my-4   justify-center">
          <img src="/banner.png" alt="" className=" w-48 md:w-96 " />
        </div>
      </div>
    </div>
  );
}
export default Banner;
