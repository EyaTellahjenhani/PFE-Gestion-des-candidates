import React, { useState } from "react";
import NavbarSidebarLayout from "../../Layouts/NavbarSidebarLayout";
import Breadcrumbe from "../../components/Breadcrumb";
import "react-quill/dist/quill.snow.css";
import { Link, useParams } from "react-router-dom";
import { Button, Modal, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import { API_BASE_URL } from "../../constant/constant";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';



const PostDetails = () => {
  const navigate = useNavigate();

  let { id } = useParams();
  function asyncList() {
    return axios.get(API_BASE_URL + "/admin/offre/" + id, {
      withCredentials: true,
    });
  }
  const { data, isLoading } = useFetch(asyncList);
  const [openModal, setOpenModal] = useState(false);

  const [loading ,setLoading] =useState(false);
  const [errors, setErrors] = useState("");


  const handleDelete = async() => {
    setLoading(true);
    try {
      await axios
        .delete(API_BASE_URL + "/admin/offre/" + id, {
          withCredentials: true,
        })
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message);
          navigate(-1);
          setOpenModal(false);
        })
        .catch((err) => {
          setErrors(err.response.data.message);
          setLoading(false);
        });
    } catch (err) {
      setErrors(err.response.data.message);
      setLoading(false);
    }
  };



  return (
    <NavbarSidebarLayout>
      {isLoading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <div>
                <Toaster />

          <Breadcrumbe pageName1="Les offres" pageName2={data?.title} />
          <div className="bg-white rounded-2xl mt-4 p-4">
            <div className="p-2 space-y-6">
              <div className="space-y-6 p-6">
                <div>
                  <p className="text-2xl font-bold text-gray-700">
                    {data?.title}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Catégorie:
                  </p>
                  <p>{data?.category?.title || "inconnu"}</p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Type de contrat:
                  </p>
                  <p>{data?.contractType}</p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Localisation:
                  </p>
                  <p>{data?.location.title}</p>
                </div>

                {data?.contractType === "Stage" && (
                  <div className="flex items-center gap-3">
                    <p className="block text-lg font-bold text-gray-700">
                      Durée:
                    </p>
                    <p>{data?.duration}</p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Niveau d’études requis:
                  </p>
                  <p>{data?.educationLevel}</p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="block text-lg font-bold text-gray-700">
                    Expérience requise (années):
                  </p>
                  <p>{data?.experience}</p>
                </div>

                <div>
                  <p className="block text-lg font-bold text-gray-700">
                    Description:
                  </p>
                  <div
                    className="mt-1 "
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                  />
                </div>

                <div>
                  <p className="block text-lg font-bold text-gray-700">
                    Documents à soumettre:
                  </p>
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
                            value={doc}
                            defaultChecked={data?.documentsToSubmit.includes(doc)}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <span className="ml-2">{doc}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                 
                    <button 
                    onClick={()=>navigate(-1)}
                    
                    className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      Retour
                    </button>
                 
                  {
                    data.isActive && (
                      <>
                      <Link to={`/dashboard/post/edit/${data._id}`}>
                    <button className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Modifier
                    </button>
                  </Link>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Supprimer
                  </button>
                  <Modal
                    show={openModal}
                    size="md"
                    onClose={() => setOpenModal(false)}
                    popup
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Êtes-vous sûr de vouloir supprimer cette offre ?
                        </h3>
                        
                        <div className="flex justify-center gap-4">
                        {errors && (
                <div className="text-red-500 text-xs">{errors}</div>
              )}
                          <Button
                            color="failure"
                            onClick={handleDelete}
                          >
                            {
                 loading? "Suppression en cours..." : "Oui, je suis sûr"
  
               } 
                          </Button>
                          <Button
                            color="gray"
                            onClick={() => setOpenModal(false)}
                          >
                            Non, annuler
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                      </>
                     
                    )
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </NavbarSidebarLayout>
  );
};

export default PostDetails;
