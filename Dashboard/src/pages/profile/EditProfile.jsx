import React, { useState } from "react";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import { Button, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import picture from "../../assets/profile.png";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import { API_BASE_URL } from "../../constant/constant";
import toast from "react-hot-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const { data, error, isLoading ,setData} = useFetch(() =>
    axios.get(API_BASE_URL + "/profile", { withCredentials: true })
  );
  const [loading, setLoading] = useState(false);
  
  const [formValues, setFormValues] = useState({
    fullName: data?.fullName,
    email: data?.email,
    phonenum: data?.phonenum,
    picture: picture,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFormValues({
            ...formValues,
            picture:reader.result
          });
        }
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
       await axios.put(
        API_BASE_URL + "/profile/update",
        formValues,
        { withCredentials: true }
      ).then((response) => {
        setLoading(false);
        setData(response.data.user);
        toast.success(response.data.message);
        navigate(-1);
      }).catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
    
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <NavbarSidebarLayout>
      <div>
        <Breadcrumbe pageName1="Admin" pageName2="Modifier le profil" />
        <div className="bg-white rounded-2xl mt-4 p-4">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-700">{error}</p>
          ) : (
            <div className="p-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6 p-6">
                <div>
                  <div className="flex justify-center">
                    {formValues.picture && (
                      <div className="mt-2">
                        <img
                          src={formValues.picture}
                          alt="Profile Preview"
                          className="h-32 w-32 rounded-full object-cover"
                        />
                      </div>
                    )}
                    {!formValues.picture && (
                      <div className="mt-2">
                        <img
                          src={data?.picture}
                          alt="Current Profile"
                          className="h-32 w-32 rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom & Prénom
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    defaultValue={data.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={data.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Num téléphone
                  </label>
                  <input
                    type="phonenum"
                    name="phonenum"
                    defaultValue={data.phonenum}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image de profil
                  </label>
                  <input
                    type="file"
                    name="picture"
                    accept="image/png, image/jpeg , image/jpg"
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    style={{ backgroundColor: "#6B7280" }}
                    onClick={() => navigate("/dashboard/profile")}
                  >
                    Annuler
                  </Button>
                  <Button
                    disabled={loading}
                    type="submit"
                    style={{ backgroundColor: "#1a56db" }}
                  >
                    {loading ? "En cours..." : "Sauvegarder les modifications"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default EditProfile;
