import React, { useState } from "react";
import NavbarUser from "../../components/NavbarUser";
import FooterUser from "../../components/FooterUser";
import { API_BASE_URL } from "../../constant/constant";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import { Pagination, Spinner } from "flowbite-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const OffreList = () => {

  // Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [RequestPerPage, setRequestPerPage] = useState(5);
  const pagesVisited = (pageNumber - 1) * RequestPerPage;

  const onPageChange = (page) => {
    setPageNumber(page);
  };


  function asyncList() {
    return axios.get(API_BASE_URL + "/user/offre/", { withCredentials: true });
  }
  const { data, isLoading, error } = useFetch(asyncList);

  return (
    <div>
      <NavbarUser />
      <div className="container mx-auto">
        {/* <h1 className="text-4xl font-bold mt-20 text-center">
          Welcome to HR Maps
        </h1>
        <p className="text-lg mt-5 mb-20 text-center">
          The best platform to manage your HR department
        </p> */}

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Listes des offres d'emplois
          </h1>
          {isLoading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) :

          error? (
            <h1 className="text-2xl text-center  text-red-600">{error}</h1>
          ) :
          
          
          data.length === 0 ? (
            <h1 className="text-2xl font-bold">Il n'y a pas d'offres</h1>
          ) : (
            <>
            
            <div className="flex items-center justify-end mb-5 gap-2">
      <select
        name="location"
        id="location"
        data-model="on(change)|location"
        className="mt-1"
      >
        <option value="">Toutes les villes</option>
        <option value="tunis">Tunis</option>
                    <option value="ariana">Ariana</option>
                    <option value="ben_arous">Ben Arous</option>
                    <option value="manouba">Manouba</option>
                    <option value="nabeul">Nabeul</option>
                    <option value="zaghouan">Zaghouan</option>
                    <option value="bizerte">Bizerte</option>
                    <option value="beja">Béja</option>
                    <option value="jendouba">Jendouba</option>
                    <option value="kef">Le Kef</option>
                    <option value="siliana">Siliana</option>
                    <option value="kairouan">Kairouan</option>
                    <option value="kasserine">Kasserine</option>
                    <option value="sidi_bouzid">Sidi Bouzid</option>
                    <option value="sousse">Sousse</option>
                    <option value="monastir">Monastir</option>
                    <option value="mahdia">Mahdia</option>
                    <option value="sfax">Sfax</option>
                    <option value="gafsa">Gafsa</option>
                    <option value="tozeur">Tozeur</option>
                    <option value="kebili">Kébili</option>
                    <option value="gabes">Gabès</option>
                    <option value="medenine">Médenine</option>
                    <option value="tataouine">Tataouine</option>
      </select>
      <select
        name="type"
        id="type"
        className="mt-1"
      >
        <option value="">Tous les types</option>
        <option value="Temps plein">Temps plein</option>
                  <option value="Temps partiel">Temps partiel</option>
                  <option value="Stage">Stage</option>
                  <option value="Freelance">Freelance</option>
                  <option value="CDD">CDD</option>
                  <option value="CDI">CDI</option>
      </select>
    </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.slice(pagesVisited, pagesVisited + RequestPerPage).map((offre) =>(
              <Link key={offre._id} to={'/offre/'+offre._id}>
                <li className="bg-white min-h-60 hover:bg-gray-100 rounded-lg shadow-md p-6 ani_fadeInUp  aniUtil_active">
                  <h2 className="text-xl font-semibold mb-4 ">
                    
                    {offre.title}
                    
                  </h2>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"
                        />
                        <path
                          fill="currentColor"
                          d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 1 0-18 0a8.9 8.9 0 0 0 1.813 5.395"
                        />
                      </svg>
                      <p className="text-gray-900 dark:text-gray-200 ml-2">
                        
                        {offre.location.title}
                        
                      </p>
                    </div>
                    <div className="flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx={17} cy={7} r={3} />
                          <circle cx={7} cy={17} r={3} />
                          <path d="M14 14h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 4h6v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
                        </g>
                      </svg>
                      <p className="text-gray-900 dark:text-gray-200 ml-2">
                        
                        {offre.category.title}
                      </p>
                    </div>
                    <div className="flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 2048 2048"
                      >
                        <path
                          fill="currentColor"
                          d="M2048 384v1280H0V384h640V256q0-27 10-50t27-40t41-28t50-10h512q27 0 50 10t40 27t28 41t10 50v128zm-1280 0h512V256H768zM128 512v185l640 319V896h512v120l640-319V512zm768 512v128h256v-128zm1024 512V839l-640 321v120H768v-120L128 839v697z"
                        />
                      </svg>
                      <p className="text-gray-900 dark:text-gray-200 ml-2">
                      {offre.contractType}
        
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      
                      {format(new Date(offre.createdAt), "dd/MM/yyyy")}
        
                      
                      </span>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
            </ul>
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



      <FooterUser />
    </div>
  );
};

export default OffreList;
