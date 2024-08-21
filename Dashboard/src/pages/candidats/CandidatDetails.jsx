import React, { useState } from "react";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import profileImage from "../../assets/profile.png";
import useFetch from "../../Hooks/useFetch";
import { API_BASE_URL } from "../../constant/constant";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";

const CandidatDetails = () => {
  const candidatDetails = {
    NomPrenom: "Jenhani Eya Tellah",
    Email: "ayatellahj@gmail.com",
    Telephone: "25313793",
    TitreOffre: "Senior PHP/Symfony",
    DateEnvoyer: "2024-07-09",
    Statut: "En attente",
    Diplomes: "Master en Informatique",
    Niveau: "Bac +5",
    Institut: "Université de Tunis",
    Competences: ["Symfony", "PHP", "MySQL"],
    Experience: "5 ans",
    CV: "/path/to/cv.pdf", // Chemin vers le fichier CV
    LettreMotivation: "/path/to/lettre_motivation.pdf", // Chemin vers le fichier de la lettre de motivation
  };

  let { id } = useParams();
  const { data, error, isLoading, setData } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/candidate/" + id, {
      withCredentials: true,
    })
  );



  const [loading, setLoading] = useState(false);

  const handleAccept = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await axios
        .put(API_BASE_URL + "/admin/candidate/accept/" + id, null, {
          withCredentials: true,
        })
        .then((response) => {
          setData(response.data.candidate);
          setLoading(false);
          toast.success(response.data.message);
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

  const handleRefuse = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await axios
        .put(API_BASE_URL + "/admin/candidate/refuse/" + id, null, {
          withCredentials: true,
        })
        .then((response) => {
          setData(response.data.candidate);
          setLoading(false);
          toast.success(response.data.message);
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

  // Gestion de la couleur de fond selon le statut
  const getStatusColor = (status) => {
    if (status === "En attente")
      return "inline-flex items-center rounded-md bg-yellow-300 px-2 py-1 text-xs font-bold text-white";
    if (status === "Refusé")
      return "inline-flex items-center rounded-md bg-primary px-2 py-1 text-xs font-bold text-white";
    return "inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-bold text-white"; // Exemple de couleur pour un statut "Accepté"
  };

  return (
    <NavbarSidebarLayout>
      <div>
        <Breadcrumbe pageName1="Candidatures" pageName2="Détails du candidature" />
        {isLoading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center flex justify-center  text-red-600 font-bold ">
            {error}
          </div>
        ) : (
          <div className="flex mt-4 gap-5">
            <div className="flex-2 flex-col justify-center items-center space-y-6 p-6 bg-white rounded-2xl">
              <div className="flex justify-center">
                <img
                  src={data?.user?.picture?.url ? data?.user?.picture?.url: profileImage}
                  alt="Image de profil"
                  className="h-60 w-60 rounded-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Nom & Prénom:
                  </p>
                  <p>{data?.user?.fullName}</p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Email:
                  </p>
                  <p>{data?.user?.email}</p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Numéro de téléphone:
                  </p>
                  <p>{data?.user?.phonenum}</p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Ville:
                  </p>
                  <p>{data?.city}</p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Statut:
                  </p>
                  <p className={`${getStatusColor(data?.status)}`}>
                    {data?.status}
                  </p>
                </div>
               
              </div>
            </div>

            <div className="flex-1 flex-col justify-center items-center space-y-6 p-6 bg-white rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Titre de l'offre:
                  </p>
                  <p>{data?.offre.title}</p>
                </div>

                <div className="flex flex-col items-start gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Expérience Professionnelle:
                  </p>

                  <div className="flex items-center gap-3">
                    <p className="block text-base font-bold text-gray-700">
                      Diplômes:
                    </p>
                    <p>{data?.user?.diplome}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="block text-base font-bold text-gray-700">
                      Niveau:
                    </p>
                    <p>{data?.educationLevel}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="block text-base font-bold text-gray-700">
                      Institut:
                    </p>
                    <p>{candidatDetails.Institut}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Compétences:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {candidatDetails.Competences.map((competence, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                      >
                        {competence}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Années d'expérience:
                  </p>
                  <p>{data?.experience} ans</p>
                </div>

                {/* Ajout de la section CV */}
                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">CV:</p>
                  <a
                    href={data?.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Télécharger le CV
                  </a>
                </div>

                {data?.coverLetter && (
                  <div className="flex items-center gap-3">
                    <p className="block text-lg font-bold text-gray-700">
                      Lettre de motivation:
                    </p>
                    <a
                      href={data?.coverLetter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Télécharger la lettre de motivation
                    </a>
                  </div>
                )}

                {data?.status == "En attente" ? (
                  <div className="flex justify-end gap-2">
                    <button
                      disabled={loading}
                      onClick={handleRefuse}
                      className="bg-primary hover:bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      {loading ? <Spinner /> : "Refuser"}
                    </button>
                    <button
                      disabled={loading}
                      onClick={handleAccept}
                      className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      {loading ? <Spinner /> : "Accepter"}
                    </button>
                  </div>
                ):  <div className="flex items-center justify-end gap-3">
                <p className="block text-lg font-bold text-gray-700">
                Traité le :
                </p>
                <p>
                  {data.traitedAt
                    ? format(new Date(data?.traitedAt), "dd/MM/yyyy HH:mm")
                    : "Non renseigné"}
                </p>
              </div>
              }
              </div>
            </div>
          </div>
        )}
      </div>
    </NavbarSidebarLayout>
  );
};

export default CandidatDetails;
