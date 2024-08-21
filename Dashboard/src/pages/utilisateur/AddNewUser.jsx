import React, { useState } from "react";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constant/constant";
import toast from "react-hot-toast";

const AddNewUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenum, setPhone] = useState("");


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await axios
        .post(API_BASE_URL + "/admin/auth/add",{fullName, email, phonenum} , {
          withCredentials: true,
        })
        .then((response) => {
          setLoading(false);
          toast.success(response.data.message);
          navigate(-1);
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


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newUser = {
//         fullName,
//         email,
//         phonenum,
//       };
//       await axios.post(API_BASE_URL + "/admin/auth/add", newUser, {
//         withCredentials: true,
//       });
//       navigate("/dashboard/users"); // Rediriger vers la liste des administrateurs
//     } catch (error) {
//       console.error("Failed to add user:", error);
//     }
//   };

  return (
    <NavbarSidebarLayout>
      <div>
        <Breadcrumbe pageName1="administrateur" pageName2="Ajouter un administrateur" />

        <div className="bg-white rounded-2xl mt-4 p-6">
          <h2 className="text-lg font-bold sm:text-2xl mb-4">
            Ajouter un nouvel administrateur
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="fullName" value="Nom & Prénom" />
              <TextInput
                id="fullName"
                type="text"
                placeholder="Nom Prenom"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" value="Numéro de téléphone" />
              <TextInput
                id="phone"
                type="text"
                placeholder="12 345 678 "
                value={phonenum}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <p className="text-sm text-gray-500"> 
            Lorsque vous ajoutez un nouvel administrateur, il recevra automatiquement un email contenant ses identifiants de connexion, y compris un mot de passe, lui permettant d'accéder au tableau de bord administrateur
            </p> 
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                color="gray"
                onClick={() => navigate(-1)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={loading} className="bg-primary text-white">
                {loading ? "En cours..." : "Ajouter l'administrateur"}
              </Button>
            </div>
           
          </form>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default AddNewUser;
