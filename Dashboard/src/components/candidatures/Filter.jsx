import React, { useState } from "react";
import { Select, Button } from "flowbite-react";
import { FiFilter } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

import axios from "axios";

import { API_BASE_URL } from "../../constant/constant";
import useFetch from "../../Hooks/useFetch";

const Filter = ({searchParams,refresh,archive}) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [searchValue, setSearchValue] = useState({
    status: searchParams.get('status') || "",
    offre: searchParams.get('offre') || "",
  })


const handelSearch = (e) => {
  const { name, value } = e.target;
    setSearchValue(prev => ({...prev, [name]: value }),)
    searchParams.set(name, value);
    searchParams.toString();
    window.history.replaceState(null, null, '?' + searchParams);
    refresh();
  };

 
  const { data } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/offre/", { withCredentials: true })
  );


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
          
  <Select
      name="offre"
      value={searchValue.offre}
      onChange={handelSearch}
      className="w-full bg-white border-gray-300"
    >
      <option value="">Tous les offre</option>
      {data?.map((item) => (
        <option key={item._id} value={item._id}>
          {item.title.slice(0,20)+'...'}
        </option>
      ))}
     
    </Select>

  </div>
  {
    archive &&  <div className="w-full sm:w-auto">
    <Select
      name="status"
      value={searchValue.status}
      onChange={handelSearch}
      className="w-full bg-white border-gray-300"
    >
      <option value="">Tous les statut</option>
      <option value="Accepté">Accepté</option>
        <option value="Refusé">Refusé</option>
     
    </Select>
  </div>
  }
 

         

          

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
