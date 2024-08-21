import React, { useState } from "react";
import NavbarUser from "../../components/NavbarUser";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import { API_BASE_URL } from "../../constant/constant";
import { Spinner, Button, Label, FileInput } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { LuGraduationCap } from "react-icons/lu";
import FooterUser from "../../components/FooterUser";
import toast from "react-hot-toast";

const CandidateForm = () => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    city: "",
    educationLevel: "",
    experience: "",
    cv: null,
    coverLetter: null,
    offre: null,
  });

  const { id } = useParams();

  const { data, isLoading, error } = useFetch(() => {
    return axios.get(`${API_BASE_URL}/user/offre/${id}`, {
      withCredentials: true,
    });
  });


  const { data: user } = useFetch(() => {
    return axios.get(`${API_BASE_URL}/profile/`, {
      withCredentials: true,
    });
  });



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv" || name === "coverLetter") {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFormData({
            ...formData,
            [name]: reader.result,
            [`${name}Name`]: file.name, // Store the original file name
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await axios
        .post(API_BASE_URL + "/user/candidate/", { ...formData, offre: data }, {
          withCredentials: true,
        })
        .then((response) => {
          setLoading(false);
          toast.success(response.data.message);
          navigate(`/mes-demandes`);
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



  return (
    <>
      <NavbarUser />
      {isLoading ? (
        <div className="text-center m-52">
          <Spinner />
        </div>
      ) : error ? (
        <h1 className="text-3xl text-center text-red-600 m-52">{error}</h1>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 mb-10 p-6 bg-white rounded-lg shadow-md">
          <div className="container mx-auto max-w-3xl p-8 bg-white rounded-lg  mb-5 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">
              N'hésite pas à postuler à l'offre
            </h2>
            <p className="text-gray-700  text-center mb-3">
              Il suffit de remplir le formulaire ci-dessous et de joindre votre
              CV.
            </p>
            <div className="mb-5">
              <p className="text-gray-700 font-bold text-start mb-3">Résume:</p>
              <p className="text-gray-700 text-start font-medium mb-2">
                Titre : <span className="text-primary">{data.title}</span>
              </p>
              <div className="flex justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
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
                <p className="text-primary font-medium dark:text-gray-200 ml-2">
                  {data?.location.title}
                </p>
              </div>
              <div className="flex justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 "
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
                <p className="text-primary font-medium dark:text-gray-200 ml-2">
                  {data?.category?.title || "inconnu"}
                </p>
              </div>
              <div className="flex justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  viewBox="0 0 2048 2048"
                >
                  <path
                    fill="currentColor"
                    d="M2048 384v1280H0V384h640V256q0-27 10-50t27-40t41-28t50-10h512q27 0 50 10t40 27t28 41t10 50v128zm-1280 0h512V256H768zM128 512v185l640 319V896h512v120l640-319V512zm768 512v128h256v-128zm1024 512V839l-640 321v120H768v-120L128 839v697z"
                  />
                </svg>
                <p className="text-primary font-medium dark:text-gray-200 ml-2">
                  {data?.contractType}
                </p>
              </div>
              <div className="flex justify-start items-center">
                <LuGraduationCap className="h-5 w-5 text-gray-600" />
                <p className="text-primary font-medium dark:text-gray-200 ml-2">
                  {data?.educationLevel}
                </p>
              </div>
            </div>
          </div>

          {data.candidates.includes(user?.id) ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">
                Vous avez déjà postulé à cette offre.
              </span>
              <p>
                Vous pouvez consulter votre candidature dans votre{" "}
                <a
                  href="/mes-demandes"
                  className="text-blue-600"
                >
                  espace candidat
                </a>
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Formulaire de candidature
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fullname"
                  >
                    Nom & Prénom
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={user?.fullName}
                    disabled
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user?.email}
                    disabled
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="telephone"
                  >
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={user?.phonenum}
                    disabled
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    Ville
                  </label>
                  <select
                    name="city"
                    id="city"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="" disabled>Sélectionner votre ville</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Ariana">Ariana</option>
                    <option value="Ben Arous">Ben Arous</option>
                    <option value="Manouba">Manouba</option>
                    <option value="Nabeul">Nabeul</option>
                    <option value="Zaghouan">Zaghouan</option>
                    <option value="Bizerte">Bizerte</option>
                    <option value="Beja">Béja</option>
                    <option value="Jendouba">Jendouba</option>
                    <option value="Kef">Le Kef</option>
                    <option value="Siliana">Siliana</option>
                    <option value="Kairouan">Kairouan</option>
                    <option value="Kasserine">Kasserine</option>
                    <option value="Sidi Bouzid">Sidi Bouzid</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Monastir">Monastir</option>
                    <option value="Mahdia">Mahdia</option>
                    <option value="Sfax">Sfax</option>
                    <option value="Gafsa">Gafsa</option>
                    <option value="Tozeur">Tozeur</option>
                    <option value="Kebili">Kébili</option>
                    <option value="Gabes">Gabès</option>
                    <option value="Medenine">Médenine</option>
                    <option value="Tataouine">Tataouine</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="educationLevel"
                  >
                    Niveau d'études
                  </label>
                  <select
                    id="educationLevel"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="" disabled>Sélectionner niveau d'etudes</option>
                    <option value="Licence">Licence</option>
                    <option value="Ingénierie">Ingénierie</option>
                    <option value="Master">Master</option>
                    <option value="Doctorat">Doctorat</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="experience"
                  >
                    Expérience (années)
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <div className="mb- block">
                    <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cv" value="CV" />
                  </div>
                  <FileInput name="cv"
                    required

                    onChange={handleChange} id="cv" helperText="Télécharger votre cv sous format PDF ou docs" />
                </div>



                <div className="mb-4">
                  <div className="mb- block">
                    <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverLetter" value="Lettre de motivation" />
                  </div>
                  <FileInput name="coverLetter"
                    
                    onChange={handleChange} id="coverLetter" helperText="Ce champ n'est pas obligatoire." />
                </div>




                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => navigate(-1)}

                    className="py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-600 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Retour
                  </button>

                  <button
                    disabled={loading}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    {
                      loading ? (<>
                        <span className="spinner-border spinner-border-sm mr-3"></span>
                        <span>Envoi en cours...</span>
                      </>
                      ) : (
                        "Soumettre"
                      )
                    }
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
      <FooterUser />
    </>
  );
};

export default CandidateForm;
