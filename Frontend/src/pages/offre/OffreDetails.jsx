import React from "react";
import NavbarUser from "../../components/NavbarUser";
import FooterUser from "../../components/FooterUser";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constant/constant";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import { Spinner } from "flowbite-react";
import { LuGraduationCap } from "react-icons/lu";



const OffreDetails = () => {
  const { id } = useParams();

  function asyncList() {
    return axios.get(`${API_BASE_URL}/user/offre/${id}`, {
      withCredentials: true,
    });
  }
  const { data, isLoading, error } = useFetch(asyncList);

  return (
    <div>
      <NavbarUser />
      {isLoading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : error ? (
        <p className="text-2xl text-center text-red-600 my-52">{error}</p>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center">
            <div className="flex flex-col">
              <nav className="hidden md:flex mb-10" aria-label="Breadcrumb">
                <ol className="inline-flex items-start space-x-1 md:space-x-3 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                    <a
                      href="/"
                      className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3 me-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                      </svg>
                      Accueil
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <a
                        href="/offres"
                        className="ms-1 text-sm font-medium text-gray-700 hover:text-primary md:ms-2 dark:text-gray-400 dark:hover:text-white"
                      >
                        Nos Offres ?
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <a
                        href="#"
                        className="ms-1 text-sm font-medium text-gray-700 hover:text-primary md:ms-2 dark:text-gray-400 dark:hover:text-white"
                      >
                        {data.title}
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
              <div className="flex justify-between mb-5 gap-3 flex-col md:flex-row">
                <div className="flex justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
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
                  <p className="text-gray-600 text-xl dark:text-gray-200 ml-2">
                    {data?.location.title}
                  </p>
                </div>
                <div className="flex justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
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
                  <p className="text-gray-600 text-xl dark:text-gray-200 ml-2">
                    {data?.category?.title || "inconnu"}
                  </p>
                </div>
                <div className="flex justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    viewBox="0 0 2048 2048"
                  >
                    <path
                      fill="currentColor"
                      d="M2048 384v1280H0V384h640V256q0-27 10-50t27-40t41-28t50-10h512q27 0 50 10t40 27t28 41t10 50v128zm-1280 0h512V256H768zM128 512v185l640 319V896h512v120l640-319V512zm768 512v128h256v-128zm1024 512V839l-640 321v120H768v-120L128 839v697z"
                    />
                  </svg>
                  <p className="text-gray-600 text-xl dark:text-gray-200 ml-2">
                    {data?.contractType}
                  </p>
                </div>
                <div className="flex justify-start items-center">
                <LuGraduationCap className="h-5 w-5 text-primary" />
                  <p className="text-gray-600 text-xl dark:text-gray-200 ml-2">
                    {data?.educationLevel}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-2">
                  {data.title}
                </h1>
                <a
                  href={"/candidature/"+ data._id}
                  className="bg-primary items-center text-center font-semibold text-white py-2 px-4 rounded-2xl hover:bg-red-800"
                >
                  Je suis intéressé
                </a>
              </div>
              <div className="mt-3 flex flex-col text-xl max-w-2xl">
              <div className="flex flex-row gap-2">
                <h1 className="font-medium text-gray-700">Experience:</h1>
                <div className="font-normal text-lg">{data.experience} ans</div>
              </div>
                <h1 className="font-medium text-gray-700 my-3">Description du poste:</h1>
                <div
                  className="font-extralight text-base  [&>h2]:text-primary  [&>h2]:text-xl"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                ></div>

                <a
                  href={"/candidature/"+ data._id}
                  className="bg-primary items-center mt-10 text-center font-semibold text-white py-2 px-4 rounded-2xl hover:bg-hover dark:bg-primary dark:text-white"
                >
                  Je suis intéressé
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <FooterUser />
    </div>
  );
};

export default OffreDetails;
