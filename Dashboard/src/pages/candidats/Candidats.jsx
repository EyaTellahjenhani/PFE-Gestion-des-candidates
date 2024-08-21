import React, { useState } from "react";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import Searchbar from "../../components/Searchbar";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { API_BASE_URL } from "../../constant/constant";
import axios from "axios";
import { format } from "date-fns";

import { Pagination, Spinner, Tooltip } from "flowbite-react";
import Filter from "../../components/candidatures/Filter";

const Candidats = () => {
  // Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [RequestPerPage, setRequestPerPage] = useState(5);
  const pagesVisited = (pageNumber - 1) * RequestPerPage;

  const onPageChange = (page) => {
    setPageNumber(page);
  };
  // end Pagination

  const { data, error, isLoading,searchParams,refresh } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/candidate?"+searchParams, { withCredentials: true })
  );

  return (
    <NavbarSidebarLayout>
      <div>
        <Breadcrumbe pageName1="Les candidatures" pageName2="Liste des candidatures" />

        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <h2 className="text-lg font-bold sm:text-2xl">Les candidatures
          </h2>
          <div className="flex gap-4 justify-center items-center">
          <Filter searchParams={searchParams} refresh={refresh} />
          </div>
        </div>

        <div className="bg-white rounded-2xl mt-4 p-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">Liste des candidatures</h3>
              <h5 className="text-blue-600 ">
                Il y a {data?.length} demandes en attente
              </h5>
            </div>
            <hr className="my-2" />
            {isLoading ? (
              <div className="flex justify-center items-center my-52">
                <Spinner />
              </div>
            ) : error ? (
              <div className="text-center text-2xl my-20 text-red-600">
                {error}
              </div>
            ) : (
              <>
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
                          <div className="flex items-center">Num tél</div>
                        </th>

                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          <div className="flex items-center">Titre d'offre</div>
                        </th>

                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            Date d'envoyer
                          </div>
                        </th>

                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          <div className="flex items-center">Statut</div>
                        </th>

                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          <div className="flex items-center">Action</div>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data
                        .slice(pagesVisited, pagesVisited + RequestPerPage)
                        .map((c, i) => (
                          <tr
                            className=" bg-white font-medium border-b"
                            key={i}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {c.user.fullName}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                            <Tooltip style="light" content={c.user.email}>
                          {c.user.email.slice(0, 15) + '...'}
                          </Tooltip>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {c.user.phonenum}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <Tooltip style="light" content={c.offre.title}>
                          {c.offre.title.slice(0, 20) + '...'}
                          </Tooltip>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              {format(
                                new Date(c.createdAt),
                                "dd/MM/yyyy HH:mm"
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center rounded-md bg-[#F4C54D] px-2 py-1 text-xs font-bold text-white ">
                                {c.status}
                              </span>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex gap-2 text-[#718096]">
                                <Link
                                  to={"/dashboard/candidat/details/" + c._id}
                                >
                                  <FaEye className="w-5 h-5" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex overflow-x-auto sm:justify-center">
                  <Pagination
                    currentPage={pageNumber}
                    totalPages={Math.ceil(data?.length / RequestPerPage)}
                    onPageChange={onPageChange}
                    showIcons
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default Candidats;
