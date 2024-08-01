import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({ setSearchQuery }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative">
      <div>
        <img
          src="search4.avif"
          alt="Background"
          className="w-full h-[300px] md:h-[450px] object-cover opacity-80"
        />
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="md:w-1/2">
          <div className="flex justify-between p-1 px-3 bg-slate-50 rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 outline-none w-full max-w-xs"
              onChange={handleSearchChange}
            />
            <button
              type="button"
              className="p-2 bg-[#FD6A31] text-white hover:bg-[#e35a1e] flex gap-2 transition-colors"
            >
              <SearchIcon />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
