import React, { useState } from 'react';
import { Card, Pagination, Spinner } from 'flowbite-react';
import { HiOutlineUserGroup, HiOutlineClipboardCheck, HiOutlineArchive, HiOutlineBriefcase } from 'react-icons/hi';
import axios from 'axios';
import { BiCategory } from "react-icons/bi";
import { API_BASE_URL } from '../constant/constant';
import NavbarSidebarLayout from '../Layouts/NavbarSidebarLayout';
import Breadcrumbe from '../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { LuClipboardList } from "react-icons/lu";
import useFetch from '../Hooks/useFetch';
import { format } from 'date-fns';




const Dashboard = () => {

  // Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [RequestPerPage, setRequestPerPage] = useState(5);
  const pagesVisited = (pageNumber - 1) * RequestPerPage;

  const onPageChange = (page) => {
    setPageNumber(page);
  };
  // end Pagination

  const { data: stats } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/statistics/", { withCredentials: true })
  );


  const { data, error, isLoading, setData } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/candidate/", { withCredentials: true })
  );


  return (
    <NavbarSidebarLayout>
      <Breadcrumbe pageName1="Tableau de bord" />
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Tableau de bord</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <Link to={"/dashboard/candidats/"}>
            <Card>
              <div className="flex items-center space-x-4">
                <HiOutlineUserGroup className="h-12 w-12 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold">Candidats en attente</h3>
                  <p className="text-2xl font-bold">{stats?.pendingCandidates}</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to={"/dashboard/candidats/candidaturearchivier/"}>
            <Card>
              <div className="flex items-center space-x-4">
                <HiOutlineClipboardCheck className="h-12 w-12 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold">Candidats archivées</h3>
                  <p className="text-2xl font-bold">{stats?.archivedCandidates}</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to={"/dashboard/candidats/candidatspontanee/"}>
            <Card>
              <div className="flex items-center space-x-4">
                < LuClipboardList className="h-12 w-12 text-orange-600" />
                <div>
                  <h3 className="text-lg font-semibold">Candidats Spontanée</h3>
                  <p className="text-2xl font-bold">{stats?.spontaneousCandidate}</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to={"/dashboard/posts/"}>
            <Card>
              <div className="flex items-center space-x-4">
                <HiOutlineBriefcase className="h-12 w-12 text-yellow-600" />
                <div>
                  <h3 className="text-lg font-semibold">Offres en cours</h3>
                  <p className="text-2xl font-bold">{stats?.totalOffres}</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to={"/dashboard/posts/postsarchivier/"}>
            <Card>
              <div className="flex items-center space-x-4">
                <HiOutlineArchive className="h-12 w-12 text-gray-600" />
                <div>
                  <h3 className="text-lg font-semibold">Offres archivées</h3>
                  <p className="text-2xl font-bold">{stats?.archivedOffres}</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to={"/dashboard/settings/"}>
            <Card>
              <div className="flex items-center space-x-4">
                <BiCategory className="h-12 w-12 text-yellow-400" />
                <div>
                  <h3 className="text-lg font-semibold">Nombre de Categorie</h3>
                  <p className="text-2xl font-bold">{stats?.totalCategories}</p>
                </div>
              </div>
            </Card>
          </Link>

        </div>
       
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Candidatures en attente</h3>
              {
          isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : error ? (
            <div className="text-center text-2xl my-28 text-red-600">
              {error}
            </div>
          ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr >
                    <th
                        className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-600" >
                        Offre
                      </th>
                      <th
                        className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-600" >
                        Nom & prénom
                      </th>
                      <th
                        className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-600"
                      >
                        Email
                      </th>

                      <th
                        className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-600"
                      >
                        Date de Candidature
                      </th>
                    </tr>

                  </thead>
                  <tbody>
                    {data?.slice(pagesVisited, pagesVisited + RequestPerPage).map((c, i) => (
                      <tr key={c._id}>
                        <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-600">
                          {c?.offre.title}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-600">
                          {c?.user?.fullName}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-600">
                          {c?.user?.email}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-600">
                          {format(new Date(c.createdAt), "dd/MM/yyyy HH:mm")}
                        </td>
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
    </NavbarSidebarLayout>
  );
};

export default Dashboard;
