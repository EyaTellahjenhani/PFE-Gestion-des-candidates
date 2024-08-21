const express = require("express");
const { authMiddleware } = require("../../Middleware/authMiddleware");
const { getMyCandidate, createCandidat, deleteCandidat } = require("../../controller/userController/candidateController");
const candidateRouter = express.Router();

candidateRouter.get("/",authMiddleware, getMyCandidate);
candidateRouter.post("/",authMiddleware, createCandidat);
candidateRouter.delete("/:id",authMiddleware, deleteCandidat);

module.exports = candidateRouter;