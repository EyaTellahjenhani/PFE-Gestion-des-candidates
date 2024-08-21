const express = require("express");
const { authMiddleware, adminMiddleware } = require("../../Middleware/authMiddleware");
const { getAllCandidateRequest, getCandidateRequestById, acceptCandidatureRequest, refuseCandidatureRequest, getAllArchiveCandidateRequest } = require("../../controller/adminController/candidateController");
const adminCandidateRouter = express.Router();

adminCandidateRouter.get("/",authMiddleware,adminMiddleware, getAllCandidateRequest);
adminCandidateRouter.get("/archive",authMiddleware,adminMiddleware, getAllArchiveCandidateRequest);
adminCandidateRouter.get("/:id",authMiddleware,adminMiddleware, getCandidateRequestById);
adminCandidateRouter.put("/accept/:id",authMiddleware,adminMiddleware, acceptCandidatureRequest);
adminCandidateRouter.put("/refuse/:id",authMiddleware,adminMiddleware, refuseCandidatureRequest);


module.exports = adminCandidateRouter;
