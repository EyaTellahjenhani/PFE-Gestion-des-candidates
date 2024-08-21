const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);



const offreSchema = mongoose.Schema({
  title: { type: String, required: [true, "Le titre est obligatiore"] },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Le champs categorie est obligatiore"],
    ref: "Category",
  },
  description: {
    type: String,
    required: [true, "Le champs déscription est obligatiore"],
  },
  contractType: {
    type: String,
    required: [true, "Le champs type de contract est obligatiore"],
  },
  duration: { type: Number, required: false },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Le champs location est obligatiore"],

    ref: "Location",
  },
  educationLevel: { type: String, required: true },
  experience: { type: Number, required: true,  default: 0},
  candidatNumber: { type: Number, required: true, default: 0 },
  candidates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],

  documentsToSubmit: [
    {
      type: String,
      required: true,
    },
  ],

  isActive: { type: Boolean, required: true, default: true },

  createdAt: { type: Date, default: Date.now },
  archivedAt: { type: Date, required: false},
  updatedAt: { type: Date },
});
// create in the BD
offreSchema.plugin(AutoIncrement, { inc_field: 'ref' });

offreSchema.methods.addCandidate = async function(userId) {
  if (this.candidates.includes(userId)) {
    throw new Error("Vous avez déjà postulé à cette offre.");
  }
  
  this.candidates.push(userId);
  this.candidatNumber = this.candidates.length; 
  await this.save();
};

offreSchema.methods.removeCandidate = async function(userId) {
  const candidateIndex = this.candidates.indexOf(userId);
  if (candidateIndex !== -1) {
    this.candidates.splice(candidateIndex, 1);
    this.candidatNumber = this.candidates.length; // Update candidatNumber
    await this.save();
  }
};

const Offre = mongoose.model("Offre", offreSchema);

module.exports = Offre;
