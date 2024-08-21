const { error } = require("console");
const Candidate = require("../../models/candidateSchema");
const Offre = require("../../models/offreSchema");
const { candidatureCreate } = require("../../template/candidatureCreate");
const sendEmail = require("../../utils/sendEmail");
const cloudinary = require('cloudinary').v2;
const path = require("path");


exports.getMyCandidate = async (req, res) => {
    try {

        const result = await Candidate.find({ user: req.user }).populate("offre", "title").sort({ _id: -1 });
        if (result.length < 1) {
            return res.status(404).json({ message: "vous n'avez aucune candidature pour le moment." });
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




exports.createCandidat = async (req, res) => {
  try {
      const newCandidate = new Candidate({ ...req.body, user: req.user._id });

      const offre = await Offre.findById(req.body.offre);
      if (!offre) {
          return res.status(404).json({ message: "Offre non trouvée." });
      }

      if (req.body.cv){
          const cvExtension = path.extname(req.body.cvName); // Get the extension
          const cv = await cloudinary.uploader.upload(req.body.cv, {
              folder: "candidature/offre/"+req.body.offre._id+"/cv",
              resource_type: 'auto',
              public_id: path.basename(req.body.cvName, cvExtension), // Use the original file name without extension
              format: cvExtension.replace(".", ""), // Specify the format based on the original file extension
          });

          newCandidate.cv = cv.secure_url;
      }

      if (req.body.coverLetter){
          const coverLetterExtension = path.extname(req.body.coverLetterName); // Get the extension
          const coverLetter = await cloudinary.uploader.upload(req.body.coverLetter, {
              folder: "candidature/offre/"+req.body.offre._id+"/coverLetter",
              resource_type: 'auto',
              public_id: path.basename(req.body.coverLetterName, coverLetterExtension), // Use the original file name without extension
              format: coverLetterExtension.replace(".", ""), // Specify the format based on the original file extension
          });
          newCandidate.coverLetter = coverLetter.secure_url;
      }

      await newCandidate.save();
      await offre.addCandidate(req.user._id);

      await sendEmail({
          email: req.user.email,
          subject: "Votre candidature a bien été enregistrée.",
          message: candidatureCreate(req.user,offre)
      });  

      res.status(201).json({ message: "Votre candidature a bien été enregistrée.", candidate: newCandidate });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }

}



exports.deleteCandidat = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        if (!candidate) {
            return res.status(404).json({ message: "Candidature non trouvée." });
        }

        const offre = await Offre.findById(candidate.offre);
        await offre.removeCandidate(req.user._id);

        res.status(200).json({ message: "Candidature supprimée avec succès." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}