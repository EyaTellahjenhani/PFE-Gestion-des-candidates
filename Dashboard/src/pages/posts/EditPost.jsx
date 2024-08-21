import React, { useEffect, useState } from "react";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import { API_BASE_URL } from "../../constant/constant";
import { useQuery } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const EditPost = () => {
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();

  // Fetch category and location data
  const { data: categoryList } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/category/", { withCredentials: true })
  );

  const { data: locationList } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/location/", { withCredentials: true })
  );

   const { data, isLoading } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/offre/"+id, { withCredentials: true })
  );

  // State Management
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    duration: "",
    educationLevel: "",
    experience: "",
    documentsToSubmit: [],
    contractType: "",
  });

  // Update form values and quill editor content
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (content) => {
    setValue(content);
    setFormValues((prev) => ({ ...prev, description: content }));
  };

  const handleDocChange = (e) => {
    const { value, checked } = e.target;
    setFormValues((prev) => {
      const updatedDocs = checked
        ? [...prev.documentsToSubmit, value]
        : prev.documentsToSubmit.filter((doc) => doc !== value);
      return { ...prev, documentsToSubmit: updatedDocs };
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        API_BASE_URL + "/admin/offre/" + id,
        formValues,
        { withCredentials: true }
      );

      toast.success(response.data.message);
      navigate(-1);


    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");

    } finally {
      setLoading(false);
    }
  };

  // Effect to load form data
  useEffect(() => {
    if (data) {
      setFormValues((prev) => ({
        ...prev,
        title: data.title,
        category: data.category?._id,
        location: data.location?._id,
        description: data.description,
        duration: data.duration,
        educationLevel: data.educationLevel,
        experience: data.experience,
        documentsToSubmit: data.documentsToSubmit,
        contractType: data.contractType,
      }));
      setValue(data.description);
    }
  }, [data]);

  return (
    <NavbarSidebarLayout>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Breadcrumbe
            pageName1="Les offres"
            pageName2="Modifier l'offre"
            pageName3={data?.title}
          />
          
          <div className="bg-white rounded-2xl mt-4 p-4">
            <div className="p-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6 p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Titre
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Catégorie
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formValues.category}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="" disabled>
                      Sélectionnez la catégorie de contrat
                    </option>
                    {categoryList?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={handleQuillChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type de contrat
                  </label>
                  <select
                    name="contractType"
                    value={formValues.contractType}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="" disabled>
                      Sélectionnez le type de contrat
                    </option>
                    <option value="Temps plein">Temps plein</option>
                    <option value="Temps partiel">Temps partiel</option>
                    <option value="Stage">Stage</option>
                    <option value="Freelance">Freelance</option>
                    <option value="CDD">CDD</option>
                    <option value="CDI">CDI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formValues.location}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="" disabled>
                      Sélectionnez l'emplacement de contrat
                    </option>
                    {locationList?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                {formValues.contractType === "Stage" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Durée
                    </label>
                    <select
                      name="duration"
                      value={formValues.duration}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="" disabled>
                        Sélectionnez la durée
                      </option>
                      <option value="3">3 mois</option>
                      <option value="4">4 mois</option>
                      <option value="6">6 mois</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Niveau d’études requis
                  </label>
                  <select
                    name="educationLevel"
                    value={formValues.educationLevel}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="" disabled>
                      Sélectionner le niveau d’études
                    </option>
                    <option value="Bachelor's">Licence</option>
                    <option value="Engineering">Ingénierie</option>
                    <option value="Master's">Master</option>
                    <option value="PhD">Doctorat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expérience requise (années)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formValues.experience}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Documents à soumettre
                  </label>
                  <div className="mt-2 space-y-1">
                    {[
                      "CV",
                      "Lettre de motivation",
                    ].map((doc) => (
                      <div key={doc}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="documentsToSubmit"
                            checked={formValues?.documentsToSubmit?.includes(doc)}
                            onChange={handleDocChange}
                            value={doc}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <span className="ml-2">{doc}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>


                <div className="flex justify-end space-x-4">
                  
                    <Button
                      type="button"
                      onClick={()=>navigate(-1)}
                      className="bg-gray-500 hover:bg-gray-400"
                    >
                      Annuler
                    </Button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loading ? "En cours..." : "Modifier l'offre"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </NavbarSidebarLayout>
  );
};

export default EditPost;
