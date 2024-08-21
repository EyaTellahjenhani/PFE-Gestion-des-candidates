const Candidate = require("../../models/candidateSchema");
const { acceptCandidature } = require("../../template/acceptCandidature");
const { refuseCandidature } = require("../../template/refuseCandidature");
const sendEmail = require("../../utils/sendEmail");

exports.getAllCandidateRequest = async (req,res)=>{
    try {

        const {
            offre
            } = req.query;
  
          
            const filter = {
              status: "En attente"
            };
           
           
            if (offre) {
              filter.offre = offre;
            }



        const result = await Candidate.find(filter)
        .populate("offre", "title")
        .populate("user", "fullName email phonenum")
        .sort({ _id: -1 });
        if (result.length < 1) {
            return res.status(404).json({ message: "Aucune candidature n'est disponible pour le moment." });
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getAllArchiveCandidateRequest = async (req,res)=>{
    try {
        const {
          status ,
          offre
          } = req.query;

        
          const filter = {
            status:{ 
            $in: ["Refusé", "Accepté"]
          }};
         
           if (status) {
            filter.status = status;
          }
          if (offre) {
            filter.offre = offre;
          }
         


        const result = await Candidate.find(filter)
        .populate("offre", "title")
        .populate("user", "fullName email phonenum")
        .sort({ _id: -1 });
        if (result.length < 1) {
            return res.status(404).json({ message: "Aucune candidature n'est archivée pour le moment." });
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getCandidateRequestById = async (req,res)=>{
    try {
        const result = await Candidate.findById(req.params.id)
        .populate("offre user", "title fullName email phonenum picture");
        if (!result) {
            return res.status(404).json({ message: "Candidature non trouvée." });
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


exports.acceptCandidatureRequest = async (req,res)=>{
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, { $set: { status: "Accepté", traitedAt:Date.now() } }, { new: true }).populate("offre user", "title fullName email");
        if (!candidate) {
            return res.status(404).json({ message: "Candidature non trouvée." });
        } else {

            await sendEmail({
                email: candidate.user.email,
                subject: `Suite à votre candidature au poste de ${candidate.offre.title} chez HRMaps.`,
                message: acceptCandidature(candidate.user,candidate.offre)
              });  

            res.status(201).json({message: "La candidature a été bien accepter" ,
                candidate: candidate
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



exports.refuseCandidatureRequest = async (req,res)=>{
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, { $set: { status: "Refusé", traitedAt:Date.now()  } }, { new: true }).populate("offre user", "title fullName email");
        if (!candidate) {
            return res.status(404).json({
                 message: "Candidature non trouvée." ,
            });
        } else {
            await sendEmail({
                email: candidate.user.email,
                subject: `Suite à votre candidature au poste de ${candidate.offre.title} chez HRMaps.`,
                message: refuseCandidature(candidate.user,candidate.offre)
              }); 
            res.status(201).json({message: "la candidature a été refuser", candidate: candidate
        });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


