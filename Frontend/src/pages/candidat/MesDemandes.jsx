import React, { useState } from "react";
import NavbarUser from "../../components/NavbarUser";
import FooterUser from "../../components/FooterUser";
import { API_BASE_URL } from "../../constant/constant";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import { Pagination, Spinner } from "flowbite-react";
import { format } from "date-fns";
import toast from "react-hot-toast";


const MesDemandes = () => {

  // Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [RequestPerPage, setRequestPerPage] = useState(5);
  const pagesVisited = (pageNumber - 1) * RequestPerPage;

  const onPageChange = (page) => {
    setPageNumber(page);
  };


  const { data, isLoading, error ,setData} = useFetch(()=> {
    return axios.get(`${API_BASE_URL}/user/candidate`, {
    withCredentials: true,
  });}
);


const deletehandler = (id) => {
  if (window.confirm("Êtes-vous sûr ?")) {
    axios
     .delete(`${API_BASE_URL}/user/candidate/${id}`, {
        withCredentials: true,
      })
     .then((res) => {
       setData(data.filter((item) => item._id!== id));
       toast.success(res.data.message);
      })
     .catch((err) => {
      toast.error(err.response.data.message);
      });
  }
};




  return (
    <div>
      <NavbarUser />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Mes Demandes</h1>

        {isLoading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : error ? (
          <h1 className="text-2xl text-center text-red-600 m-52">{error}</h1>
        ) : data.length === 0 ? (
          <h1 className="text-2xl font-bold text-center">
            Vous n'avez aucune demande
          </h1>
        ) : (
          <div>
            <div className="shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Titre d'offre
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Statut
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Date de postulation
                    </th>

                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Supprimer</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.slice(pagesVisited, pagesVisited + RequestPerPage).map((d) => (
                    <tr key={d._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {d._id}
                      </th>
                      <td className="px-6 py-4">{d.offre.title}</td>
                      <td className="px-6 py-4">
                        {d.status == "En attente" ? (
                          <span className="px-2 py-1 text-center font-semibold leading-tight text-yellow-900 bg-yellow-100 dark:bg-yellow-500 dark:text-gray-800 rounded-full">
                            En attente
                          </span>
                        ) : d.status == "Accepté" ? (
                          <span className="px-2 py-1 font-semibold leading-tight text-green-900 bg-green-100 dark:bg-green-500 dark:text-gray-800 rounded-full">
                            Accepté
                          </span>
                        ) : (
                          <span className="px-2 py-1 font-semibold leading-tight text-red-900 bg-red-100 dark:bg-red-500 dark:text-gray-800 rounded-full">
                            Refusé
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                      {format(new Date(d.createdAt), "dd/MM/yyyy HH:mm")}                
                      </td>

                      <td className="px-6 py-4 text-right">
                          <button
                          onClick={() => deletehandler(d._id)}
                            type="submit"
                            className="text-red-600 dark:text-red-400 hover:underline"
                          >
                            Supprimer
                          </button>
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
          </div>
        )}
      </div>
      <FooterUser />
    </div>
  );
};

export default MesDemandes;
