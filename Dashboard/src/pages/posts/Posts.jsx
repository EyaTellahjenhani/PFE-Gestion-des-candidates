import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import { Button, Pagination, Spinner } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import ModalDelete from "../../components/ModalDelete";
import axios from "axios";
import { API_BASE_URL } from "../../constant/constant";
import useFetch from "../../Hooks/useFetch";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import CandidatPopup from "../../components/offres/CandidatPopup";
import Filter from "../../components/offres/Filter";

const Posts = () => {
  const [openModal, setOpenModal] = useState(false);


  // Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [RequestPerPage, setRequestPerPage] = useState(5);
  const pagesVisited = (pageNumber - 1) * RequestPerPage;


  const onPageChange = (page) => {
    setPageNumber(page);
  };
  // end Pagination

  const [category, setCategory] = useState([])
  const { data, error, isLoading, setData,refresh,searchParams } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/offre/active?" + searchParams, { withCredentials: true })
  
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
        <Breadcrumbe pageName1="Les offres" pageName2="Liste des offres" />

        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <h2 className="text-lg font-bold sm:text-2xl">Les offres</h2>
          <div className="flex gap-4 justify-center items-center">
            <Filter category={category} searchParams={searchParams} refresh={refresh} />
            
          </div>
        </div>

        {/* liste des offres */}
        <div className="bg-white rounded-2xl mt-4 p-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold mt-1 ">Liste des offres</h3>
              <Link to="/dashboard/post/create">
                <Button className=" bg-primary hover:bg-red-800 text-white font-bold text-sm px-3">
                  <FaPlus className="mr-2 h-5 w-5" />
                  Ajouter une offre
                </Button>
              </Link>
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
            ):
            data.length === 0 ? (
              <h1 className="text-2xl text-center  text-red-600">Aucune offre trouvée.</h1>
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
                        <div className="flex items-center">Date d'ajout</div>
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
                    {data?.slice(pagesVisited, pagesVisited + RequestPerPage).map((offre, i) => (
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
                          {format(new Date(offre.createdAt), "dd/MM/yyyy")}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {offre?.category?.title || "inconnu" }
                        </td>

                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-[#4A74E0] dark:text-white">
                                45%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                              <div
                                className="bg-[#4A74E0] h-1.5 rounded-full"
                                style={{ width: "45%" }}
                              />
                            </div>
                          </>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {offre.location?.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {offre.contractType}
                        </td>
                        <td className=" px-6 py-4 whitespace-nowrap">
                          <span onClick={()=>setOpenModal(true)} className="bg-gray-100 cursor-pointer text-gray-800 text-xs font-bold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            {offre.candidatNumber}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex gap-2 text-[#718096]">
                            <Link to={`/dashboard/post/details/${offre._id}`}>
                              <FaEye className="w-5 h-5" />
                            </Link>
                            <Link to={`/dashboard/post/edit/${offre._id}`}>
                              <MdEditSquare className="w-5 h-5" />
                            </Link>
                            <ModalDelete id={offre._id} setData={setData} data={data}/>
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

            {/* pagination */}
              
                    </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default Posts;
