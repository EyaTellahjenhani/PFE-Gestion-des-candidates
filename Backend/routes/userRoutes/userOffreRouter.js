const express = require("express");
const { getAllOffre, getOffreById } = require("../../controller/userController/offreController");
const userOffreRouter = express.Router();

userOffreRouter.get("/", getAllOffre);
userOffreRouter.get("/:id", getOffreById);

module.exports = userOffreRouter;