import React from "react";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import Searchbar from "../../components/Searchbar";
import PaginationCom from "../../components/Pagination";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";


const CandidatSpontanee = () => {
  return (
    <NavbarSidebarLayout>
      <div>
        <Breadcrumbe pageName1="Candidats" pageName2="Candidats Spontanée" />

        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <h2 className="text-lg font-bold sm:text-2xl">Candidats Spontanée</h2>
          <div className="flex gap-4 justify-center items-center">
            <Searchbar />
          </div>
        </div>

        <div className="bg-white rounded-2xl mt-4 p-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">Liste des Candidats Spontanée</h3>
              <h5 className="text-blue-600 ">Il y a 5 demandes en attente</h5>
            </div>
            <hr className="my-2" />

            {/* tableau des Candidats Spontanee */}
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
                      <div className="flex items-center">
                        Numéro de téléphone
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center">Date d'envoyer</div>
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
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <tr className=" bg-white font-medium border-b" key={i}>

                        <td className="px-6 py-4 whitespace-nowrap">
                          Jenhani Eya Tellah
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          ayatellahj@gmail.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          25 313 793
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          20/10/2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center rounded-md bg-[#F4C54D] px-2 py-1 text-xs font-bold text-white ">
                          En cours
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex gap-2 text-[#718096]">
                            <Link to="/dashboard/candidat/details/1">
                              <FaEye className="w-5 h-5" />
                            </Link>
                          </div>
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <PaginationCom />
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default CandidatSpontanee;
