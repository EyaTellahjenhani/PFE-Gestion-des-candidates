import React from 'react'
import { Button, Modal, Select } from "flowbite-react";

const CandidatPopup = ({openModal,setOpenModal,data}) => {

  return (
    <>
      <Modal dismissible  show={openModal} size={"2xl"} onClose={() => setOpenModal(false)}>
        <Modal.Header>List des Candidates</Modal.Header>
        <Modal.Body>
        <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>

                    <th scope="col" className="px-6 py-3">
                      Nom
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Num téléphone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((c, i) => (
                    <tr key={i} className="bg-white border-b">
                      <td className="px-6 py-4">{c.fullName}</td>
                      <td className="px-6 py-4">{c.email}</td>
                      <td className="px-6 py-4">{c.phonenum}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CandidatPopup