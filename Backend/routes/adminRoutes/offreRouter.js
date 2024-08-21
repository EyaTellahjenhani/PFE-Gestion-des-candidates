const express = require("express");
const {
  getOffreById,
  createOffre,
  updateOffre,
  deleteOffre,
  getAllActiveOffres,
  getAllArchiveOffres,
  getAllOffres,
} = require("../../controller/adminController/offreController");
const { authMiddleware, adminMiddleware } = require("../../Middleware/authMiddleware");
const offreRouter = express.Router();

offreRouter.get("/",authMiddleware,adminMiddleware, getAllOffres);
offreRouter.get("/active",authMiddleware,adminMiddleware, getAllActiveOffres);
offreRouter.get("/archive",authMiddleware,adminMiddleware, getAllArchiveOffres);

offreRouter.get("/:id",authMiddleware,adminMiddleware, getOffreById);
offreRouter.post("/", authMiddleware,adminMiddleware,createOffre);
offreRouter.put("/:id", authMiddleware,adminMiddleware,updateOffre);
offreRouter.delete("/:id",authMiddleware,adminMiddleware, deleteOffre);

module.exports = offreRouter;
