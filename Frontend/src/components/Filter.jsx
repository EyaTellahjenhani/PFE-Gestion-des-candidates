import React from "react";



const Filter = ({category}) => {

  return (
<div className="flex items-center justify-center p-4">
  <button
    id="dropdownDefault"
    data-dropdown-toggle="dropdown"
    className="text-gray-600 bg-white focus:ring-2 focus:outline-none focus:ring-blue-600 rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center border-2 border-gray-300"
    type="button"
  >
    Filtrer par catégorie
    <svg
      className="text-gray-600 w-4 h-4 ml-2"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
  {/* Dropdown menu */}
  <div
    id="dropdown"
    className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
  >
    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
      Catégorie
    </h6>
    <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
      
      {category?.map((item) => (
                      <li key={item._id} className="flex items-center">
                      <input
                        type="checkbox"
                        defaultValue={item._id}
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="apple"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        {item.title}
                      </label>
                    </li>
                    ))}
      
    </ul>
  </div>
</div>

  );
};

export default Filter;
