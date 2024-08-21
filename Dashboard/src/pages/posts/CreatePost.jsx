import React, { useState } from "react";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import { API_BASE_URL } from "../../constant/constant";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreatePost = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    title: "",
    category: "",
    description: "",
    contractType: "",
    duration: "",
    location: "",
    educationLevel: "",
    experience: "",
    documentsToSubmit: [],
  });

  function categoryFetch() {
    return axios.get(API_BASE_URL + "/admin/category/", {
      withCredentials: true,
    });
  }
  const { data: categoryList } = useFetch(categoryFetch);

  function locationFetch() {
    return axios.get(API_BASE_URL + "/admin/location/", {
      withCredentials: true,
    });
  }
  const { data: locationList } = useFetch(locationFetch);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues({
        ...formValues,
        [name]: checked
          ? [...formValues[name], value]
          : formValues[name].filter((item) => item !== value),
      });
    } else if (type === "select-multiple") {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setFormValues({ ...formValues, [name]: selectedOptions });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await axios
        .post(API_BASE_URL + "/admin/offre/", formValues, {
          withCredentials: true,
        })
        .then((response) => {
          setLoading(false);
          toast.success(response.data.message);
          navigate("/dashboard/posts");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };

  const [value, setValue] = useState("");

  const hadelQuillChange = (e) => {
    setValue(e);
    setFormValues({ ...formValues, description: e });
  };

  return (
    <NavbarSidebarLayout>
      <div>
        <Breadcrumbe
          pageName1="Les offres"
          pageName2="Créer une nouvelle offre"
        />
        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <h2 className="text-lg font-bold sm:text-2xl">Créer une offre</h2>
          <div className="flex gap-4 justify-center items-center"></div>
        </div>

        <div className="bg-white rounded-2xl mt-4 p-4">
          <div className="p-2 space-y-6">
            <form className="space-y-6 p-6 ">
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="category"
                  name="category"
                  value={formValues.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Sélectionnez la categorie de contrat
                  </option>
                  {categoryList?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
                </select>
                <p className="text-xs m-1">
                Si la catégorie n'est pas listée, vous pouvez <Link className="text-blue-500"  to={{ pathname: '/dashboard/settings',search: '?q=category'}}>créer une nouvelle catégorie.</Link> Actualisez ensuite cette page pour sélectionner la catégorie.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={hadelQuillChange}
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
              {formValues.contractType === "Stage" && (
                <>
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

                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="location"
                  name="location"
                  required
                  value={formValues.location}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Sélectionnez l'emplacement de contrat
                  </option>{" "}
                  {locationList?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
                </select>
                <p className="text-xs m-1">
                Si l'emplacement n'est pas listé, vous pouvez<Link className="text-blue-500"  to={{ pathname: '/dashboard/settings',search: '?q=location'}}> créer un nouvel emplacement. </Link>Actualisez ensuite cette page pour sélectionner l'emplacement.
                </p>
              </div>
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
                  <option value="Licence">Licence</option>
                  <option value="Ingénierie">Ingénierie</option>
                  <option value="Master">Master</option>
                  <option value="Doctorat">Doctorat</option>
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
                  {["CV", "Lettre de motivation"].map(
                    (doc) => (
                      <div key={doc}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="documentsToSubmit"
                            value={doc}
                            checked={formValues.documentsToSubmit.includes(doc)}
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <span className="ml-2">{doc}</span>
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Link to="/dashboard/posts">
                  <Button type="button" style={{ backgroundColor: "#6B7280" }}>
                    Annuler
                  </Button>
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? "En cours..." : "Créer une offre"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default CreatePost;
