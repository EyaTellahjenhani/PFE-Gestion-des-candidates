import React, { useState } from "react";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import Searchbar from "../../components/Searchbar";
import useFetch from "../../Hooks/useFetch";
import { API_BASE_URL } from "../../constant/constant";
import axios from "axios";
import { format } from "date-fns";
import { Button, Spinner } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

  

const ListUsers = () => {
  const { data, error, isLoading,searchParams ,refresh} = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/auth/all?"+searchParams, { withCredentials: true })
  );
  const [searchValue, setSearchValue] = useState("");

  const handelSearch = (e) => {
    const { name, value } = e.target;
      setSearchValue(value)
      searchParams.set(name, value);
      searchParams.toString();
      window.history.replaceState(null, null, '?' + searchParams);
      refresh();
    };


    console.log(searchValue)


  return (
    <NavbarSidebarLayout>
      <div>
        <Breadcrumbe pageName1="Administrateurs" pageName2="Liste des administrateurs" />

        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <h2 className="text-lg font-bold sm:text-2xl">Administrateurs</h2>
          <div className="flex gap-4 justify-center items-center">
          <div className="relative mx-auto text-gray-600">
      <input
        className="border-2 border-gray-300 h-10 px-4 py-2.5 rounded-lg text-sm text-start inline-flex items-center focus:ring-0 focus:outline-none"
        type="search"
        name="email"
        value={searchValue}
        onChange={handelSearch}
  
        placeholder="Email.."
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <IoSearch className="text-gray-600 h-5 w-5 " />
      </button>
    </div>
          </div>
        </div>

          <div className="bg-white rounded-2xl mt-4 p-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">Liste des administrateurs</h3>
                <Link to={"/dashboard/users/add"}>
                <Button className=" bg-primary hover:bg-red-500 text-white font-bold text-sm px-3">
                  <FaPlus className="mr-2 h-5 w-5" />
                  Ajouter un administrateur
                </Button>
                </Link>
              </div>
              <hr className="my-2" />
              
              {isLoading ? (
          <div className="flex justify-center items-center mt-12">
            <Spinner/>
          </div>
        ) : error ? (
          <div className="text-center text-2xl my-28 text-red-500">
          {error}
        </div>
                ) : (
              <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right border-collapse">
                  <thead className="text-xs text-[#A0AEC0]">
                    <tr>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">Nom & Prénom</div>
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">Email</div>
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">Num téléphone</div>
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">Date de création</div>
                      </th>

                    </tr>
                  </thead>

                  <tbody>
                    {data ?.map((user, i) => (
                      <tr className="bg-white font-medium border-b" key={i}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.fullName}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.phonenum}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {format(new Date(user.createdAt), "dd/MM/yyyy HH:mm")}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                )}
            </div>
          </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default ListUsers;
