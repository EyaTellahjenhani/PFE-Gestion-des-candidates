import React from 'react'

const Cards = () => {
  return (
<div key={job.id} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-700 mb-4"><strong>Description:</strong> {job.description}</p>
            <p className="text-gray-700 mb-2"><strong>Type:</strong> {job.type}</p>
            <p className="text-gray-700 mb-2"><strong>Place:</strong> {job.place}</p>
            <p className="text-gray-700 mb-2"><strong>Les Competences Requises:</strong> {job.lesCompetencesRequises.join(', ')}</p>
            <p className="text-gray-700"><strong>Date de Creation:</strong> {job.dateDeCreation}</p>
          </div>
  )
}

export default Cards