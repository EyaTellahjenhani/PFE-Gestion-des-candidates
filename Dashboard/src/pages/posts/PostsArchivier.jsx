import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constant/constant";
import useFetch from "../../Hooks/useFetch";
import { Pagination, Spinner } from "flowbite-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import CandidatPopup from "../../components/offres/CandidatPopup";
import Filter from "../../components/offres/Filter";

const PostsArchivier = () => {
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState([])

  // Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [RequestPerPage, setRequestPerPage] = useState(5);
  const pagesVisited = (pageNumber - 1) * RequestPerPage;

  const onPageChange = (page) => {
    setPageNumber(page);
  };
  // end Pagination

 

  const { data, error, isLoading,refresh,searchParams } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/offre/archive?" + searchParams, { withCredentials: true })
  );

  const { data: categoryList } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/category/", { withCredentials: true })
  );


  useEffect(() => {
    if (categoryList) {
    setCategory(categoryList || null);
    }

    
  }, [categoryList]);

  return (
    <NavbarSidebarLayout>
      <div>
        <Breadcrumbe pageName1="Les offres" pageName2="Les offres archivier" />

        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <h2 className="text-lg font-bold sm:text-2xl">Les offres</h2>
          <div className="flex gap-4 justify-center items-center">
          <Filter category={category}  searchParams={searchParams} refresh={refresh} />
          </div>
        </div>

        {/* liste des offres */}
        <div className="bg-white rounded-2xl mt-4 p-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold mt-1 ">
                Liste des offres archivier
              </h3>
            </div>
            <hr className="my-2" />

            {/* tableau */}
            {isLoading ? (
              <div className="text-center">
                <Spinner />
              </div>
            ) : error ? (
              <div className="text-center text-2xl my-20 text-red-600">
                {error}
              </div>
            ) : data.length === 0 ? (
              <h1 className="text-2xl font-bold">Il n'y a pas d'offres</h1>
            ) : (
              <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right border-collapse">
                  <thead className="text-xs text-[#A0AEC0]">
                    <tr>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">ID</div>
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">Titre</div>
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          Date d'archivier
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">Catégorie</div>
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">Localisation</div>
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">Type</div>
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">N Candidatures</div>
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center">Action</div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data
                      ?.slice(pagesVisited, pagesVisited + RequestPerPage)
                      .map((offre, i) => (
                        <tr className=" bg-white font-medium border-b" key={i}>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {offre.ref}
                          </th>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {offre.title}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {format(new Date(offre?.archivedAt), "dd/MM/yyyy")}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {offre.category?.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {offre.location?.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {offre.contractType}
                          </td>
                          <td className=" px-6 py-4 whitespace-nowrap">
                            <span
                              onClick={() => setOpenModal(true)}
                              className="bg-gray-100 cursor-pointer text-gray-800 text-xs font-bold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                            >
                              {offre.candidatNumber}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex gap-2 text-[#718096]">
                              <Link to={`/dashboard/post/details/${offre._id}`}>
                                <FaEye className="w-5 h-5" />
                              </Link>
                            </div>
                          </td>
                          <CandidatPopup openModal={openModal} setOpenModal={setOpenModal} data={offre.candidates} />
                        </tr>
                        
                      ))}
                  </tbody>
                </table>
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
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default PostsArchivier;
