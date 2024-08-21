import React, { useState } from "react";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constant/constant";
import toast from "react-hot-toast";

const EditPassword = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
       await axios.put(
        API_BASE_URL + "/profile/changepassword",
        formValues,
        { withCredentials: true }
      ).then((response) => {
        setLoading(false);
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
        <Breadcrumbe pageName1="Admin" pageName2="Changer le mot de passe" />
        <div className="bg-white rounded-2xl mt-4 p-4">
          <div className="p-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formValues.newPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  style={{ backgroundColor: "#6B7280" }}
                  className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={() => navigate(-1)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: "#1a56db" }}
                  className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sauvegarder les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default EditPassword;
