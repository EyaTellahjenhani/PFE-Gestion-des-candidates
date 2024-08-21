import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import { API_BASE_URL } from "../constant/constant";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";



const ModalDelete = ({id, setData,data}) => {

  const navigate = useNavigate();


  const [isLoading,setIsLoading] =useState(false);
  const [errors, setErrors] = useState("");


  const handleDelete = async() => {
    setIsLoading(true);
    try {
      await axios
        .delete(API_BASE_URL + "/admin/offre/" + id, {
          withCredentials: true,
        })
        .then((response) => {
          setIsLoading(false);
          setOpenModal(false);
          toast.success(response.data.message);
          setData(data.filter((item) => item._id!== id));
        })
        .catch((err) => {
          setErrors(err.response.data.message);
          setIsLoading(false);
        });
    } catch (err) {
      setErrors(err.response.data.message);
      toast.error(response.data.message);
      setIsLoading(false);
    }
  };


  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <RiDeleteBin5Fill
        className="w-5 h-5 cursor-pointer"
        onClick={() => setOpenModal(true)}
      />
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
              <Button className="bg-primary hover:bg-red-500" disabled={isLoading}  onClick={handleDelete}>
               {
                 isLoading? "Suppression en cours..." : "Oui, je suis sûr"
  
               }
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-400" onClick={() => setOpenModal(false)}>
              Non, annuler
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDelete;
