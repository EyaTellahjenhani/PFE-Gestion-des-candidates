const mongoose = require("mongoose");


const candidateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  offre: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Offre",
  },
  status: {
    type: String,
    enum: ["En attente", "Accepté", "Refusé"],
    default: "En attente",
  },
  city:{
    type: String,
    required: true,
  },
  cv: {
    type: String,
    required: false,
  },
  coverLetter: {
    type: String,
    required: false,
  },
  skills: [{ type: String }],
  experience: {
    type: String,
    required: true,
  },
  educationLevel :{
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  traitedAt: { type: Date },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
