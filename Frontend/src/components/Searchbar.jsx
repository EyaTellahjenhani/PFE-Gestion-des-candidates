import React from "react";
import { IoSearch } from "react-icons/io5";

const Searchbar = () => {
  return (
    <div className="relative mx-auto text-gray-600">
      <input
        className="border-2 border-gray-300 h-10 px-4 py-2.5 rounded-lg text-sm text-start inline-flex items-center focus:ring-0 focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <IoSearch className="text-gray-600 h-5 w-5 " />
      </button>
    </div>
  );
};

export default Searchbar;
