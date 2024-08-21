import React from "react";
import profileImage from "../../assets/profile.png";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import { API_BASE_URL } from "../../constant/constant";
import { useAuth } from "../../Hooks/AuthContext";

const Profile = () => {
  const { data, error, isLoading } = useFetch(() =>
    axios.get(API_BASE_URL + "/profile/", { withCredentials: true })
  );
  const { logout } = useAuth();
  return (
    <NavbarSidebarLayout>
      <div>
        <Breadcrumbe pageName1="Profile" />
        <div className="bg-white rounded-2xl mt-4 p-4">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-700">{error}</p>
          ) : (
            <div className="p-2">
              <div className="p-6 flex items-center">
                <div className="mr-6">
                  <img
                    src={data?.picture.url || profileImage}
                    alt="Image de profil"
                    className="h-32 w-32 rounded-full object-cover"
                  />
                </div>
                <dl className="space-y-4">
                  <div className="flex items-center gap-3">
                    <dt className="block text-sm font-medium text-gray-500">
                      Nom & Prénom:
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                      {data.fullName}
                    </dd>
                  </div>

                  <div className="flex items-center gap-3">
                    <dt className="block text-sm font-medium text-gray-500">
                      Email:
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                      {data.email}
                    </dd>
                  </div>

                  <div className="flex items-center gap-3">
                    <dt className="block text-sm font-medium text-gray-500">
                      Num téléphone:
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                      {data.phonenum}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex justify-end space-x-4">
                <Link to="/dashboard/edit-profile">
                  <Button className="py-1 px-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Modifier le profil
                  </Button>
                </Link>
                <Link to="/dashboard/change-password">
                  <Button className="py-1 px-2 text-sm font-medium text-white bg-green-700 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                    Changer le mot de passe
                  </Button>
                </Link>
                <Button
                  onClick={logout}
                  className="py-1 px-2 text-sm font-medium text-white bg-primary hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Déconnexion
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default Profile;
