import React from "react";
import Image from "next/image";

function Banner() {
  return (
    <div className=" bg-slate-50  text-center  py-9">
      <div className="md:flex md:pt-0 pt-4 items-center justify-between p-4  mx-3 md:mx-24  gap-20">
        <div className="flex-1  ">
          <p className=" font-semibold    text-2xl md:text-5xl mb-2">
            Unlock the Flavors of Your Kitchen
          </p>
          <p className="text-slate-400 my-2 text-xl md:text-2xl">
            Your Recipes Can Spark Joy in Kitchens Around the World!
          </p>
          <p className=" text-orange-400   text-lg md:text-2xl  mt-3 md:mt-10 font-semibold">
            Share Your Recipe Now
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
