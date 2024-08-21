import React, { useState } from "react";
import { Select, Button } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

const Filter = ({category,searchParams,refresh}) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [searchValue, setSearchValue] = useState({
    category: searchParams.get('category') || "",
    title: searchParams.get('title') || "",
    type: searchParams.get('type') || "",
  })



const handelSearch = (e) => {
  const { name, value } = e.target;
    setSearchValue(prev => ({...prev, [name]: value }),)
    searchParams.set(name, value);
    searchParams.toString();
    window.history.replaceState(null, null, '?' + searchParams);
    refresh();

  };



  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
    

  };

  return (
    <div className="mt-4 flex flex-col gap-1 items-end p-4">

      <div>
        {isFilterVisible ? (
          <Button
           size={"xs"} className="bg-primary"
           onClick={toggleFilterVisibility}
            >
            <IoIosClose className=" h-6 w-6" />

          </Button>
        )
          :
(
          <Button
            onClick={toggleFilterVisibility}
            className="flex items-center bg-primary text-white hover:bg-red-800"
          >
            <FiFilter className="mr-2 h-5 w-5" />
            Filtre
          </Button>

)

        }

      </div>



      {isFilterVisible && (
                  <form>

        <div className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row gap-3 justify-center items-center shadow-md">

          <div className="relative w-full sm:w-auto mx-auto text-gray-600">
            <input
              className="border-1 hover:border-spacing-1 bg-gray-50 border-gray-300 h-10 px-4 py-2.5 rounded-lg text-sm text-start inline-flex items-center w-full sm:w-auto"
              name="title"
              placeholder="Rechercher"
              value={searchValue.title}

              onChange={handelSearch}
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <IoSearch className="text-gray-600 h-5 w-5 " />
            </button>
          </div>

          <div className="w-full sm:w-auto">
            <Select
              id="category"
              name="category"
              value={searchValue.category}
              onChange={handelSearch}
              className="w-full bg-white border-gray-300"
            >
              <option value="">Tous les catégories</option>
              {
                category.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title}
                  </option>
                ))
              }
             
            </Select>
          </div>

          <div className="w-full sm:w-auto">
            <Select
              id="type"
              name="type"
              value={searchValue.type}

              onChange={handelSearch}
              className="w-full bg-white border-gray-300"
            >
              <option value="">Tous les type</option>
              <option value="Temps plein">Temps plein</option>
                    <option value="Temps partiel">Temps partiel</option>
                    <option value="Stage">Stage</option>
                    <option value="Freelance">Freelance</option>
                    <option value="CDD">CDD</option>
                    <option value="CDI">CDI</option>
             
            </Select>
          </div>

          {/* <div className="w-full sm:w-auto">
            <Button
            type="submit"
              className="bg-primary text-white hover:bg-red-800 w-full sm:w-auto"
            >
              Rechercher
            </Button>
          </div> */}
        </div>
       </form>
      )}
    </div>
  );
};

export default Filter;
