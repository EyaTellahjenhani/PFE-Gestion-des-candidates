const Candidate = require("../../models/candidateSchema");
const Category = require("../../models/categorySchema");
const Offre = require("../../models/offreSchema")

exports.getStatistics = async (req, res)=>{
    try {
    const totalOffres = await Offre.countDocuments({isActive: true});
    const archivedOffres = await Offre.countDocuments({ isActive: false });
    const totalCategories = await Category.countDocuments({isActive: true});
    const pendingCandidates = await Candidate.countDocuments({status: 'En attente'});
    const archivedCandidates = await Candidate.countDocuments({status: { $in: ['Accepté', 'Refusé'] } });


    res.status(201).json({
        totalOffres,
        archivedOffres,
        totalCategories,
        pendingCandidates,
        archivedCandidates,
        spontaneousCandidate:0
,
        message: "Statistiques récupérées avec succès."
    });


    }catch (error) {
    res.status(500).json({ message: error.message });
  }



}