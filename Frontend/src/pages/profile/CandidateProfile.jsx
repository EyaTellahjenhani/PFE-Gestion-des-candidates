import React, { useState } from "react";
import { Button, Spinner, TextInput, Textarea } from "flowbite-react";
import { FaSave } from "react-icons/fa";
import NavbarUser from "../../components/NavbarUser";
import FooterUser from "../../components/FooterUser";
import axios from "axios";
import { API_BASE_URL } from "../../constant/constant";
import useFetch from "../../Hooks/useFetch";
import profileImage from "../../assets/profile.png";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import picture from "../../assets/profile.png";
import toast from "react-hot-toast";


const skillsOptions = [
  "Symfony",
  "PHP",
  "MySQL",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
];

const CandidateProfile = () => {
  const { data, error, isLoading, setData } = useFetch(() =>
    axios.get(API_BASE_URL + "/profile/", { withCredentials: true })
  );

  const [loading, setLoading] = useState(false);
  
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phonenum: "",
    picture: "",
    diplome: "",
    educationLevel : "",
    university : "",
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
    <>
      <NavbarUser />
      
      <div className="max-w-4xl mx-auto mt-10 mb-10 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Mon Profil
        </h2>

        {isLoading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : error ? (
        <p className="text-2xl text-center text-red-600 my-52">{error}</p>
      ) : (<>
      
   
        <div className="flex justify-center mb-10">
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
                          src={data?.picture ? data?.picture.url : picture }
                          alt="Current Profile"
                          className="h-32 w-32 rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>

        {/* Nom et prénom */}
        <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom et prénom
            </label>
            <TextInput
              id="fullName"
              type="text"
              name="fullName"
              defaultValue={data.fullName}
              onChange={handleChange}
              placeholder="Entrez le nom et prénom"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <TextInput
              id="email"
              type="email"
              name="email"
              disabled
              defaultValue={data.email}
              placeholder="Entrez l'email"
              required
            />
          </div>
        </div>

        {/* num telephone */}
        <div className="mb-6">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Numéro de téléphone
          </label>
          <TextInput
            id="phoneNumber"
            type="tel"
            name="phonenum"
            defaultValue={data.phonenum}
            onChange={handleChange}
            placeholder="Entrez le numéro de téléphone"
          />
        </div>

        {/* Expérience Professionnelle */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Expérience académique
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="diplomas"
                className="block text-sm text-gray-600 mb-1"
              >
                Diplômes
              </label>

              <TextInput
                id="diplome"
                type="text"
                onChange={handleChange}
                name="diplome"
                defaultValue={data?.diplome}

                placeholder="Entrez le diplôme"
              />
            </div>

            <div>
              <label
                htmlFor="niveau"
                className="block text-sm text-gray-600 mb-1"
              >
                Niveau
              </label>
              <TextInput
                id="niveau"
                type="text"
                onChange={handleChange}
                defaultValue={data?.educationLevel}

                name="educationLevel"
                placeholder="Entrez le niveau d'études"
              />
            </div>

            <div>
              <label
                htmlFor="institute"
                className="block text-sm text-gray-600 mb-1"
              >
                Institut
              </label>
              <TextInput
                id="institute"
                name="university"
                defaultValue={data?.university}
                onChange={handleChange}
                type="text"
                placeholder="Entrez le nom de l'institut"
              />
            </div>
          </div>
        </div>

        {/* Compétences */}
        <div className="mb-4">
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Compétences
          </label>
          <Autocomplete
            multiple
            options={skillsOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Choisissez vos compétences"
              />
            )}
          />
        </div>

        {/* CV */}
        <div className="mb-4">
          <label
            htmlFor="cv"
            className="block text-lg font-medium text-gray-800 mb-2"
          >
            CV
          </label>
          <input
            id="cv"
            type="file"
            accept=".pdf, .doc, .docx"
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
          />
        </div>

        <div className="mb-8">
                  <label className="block text-lg font-medium text-gray-800 mb-2">
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

        {/* Save button */}
        <div className="flex justify-center">
          <Button disabled={loading}
          onClick={handleSubmit}
                    type="submit" 
                    className="flex items-center bg-primary hover:bg-hover text-white font-bold px-6 py-3">
            <FaSave className="mr-2 h-5 w-5" />
            
            {loading ? "En cours..." : "Sauvegarder"}
          </Button>
        </div>
        </form>
        </>
           )}
      </div>
   
      <FooterUser />
    </>
  );
};

export default CandidateProfile;
