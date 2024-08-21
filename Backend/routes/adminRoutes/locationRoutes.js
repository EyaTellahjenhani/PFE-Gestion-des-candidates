const express = require("express");
const {
  getAllLocations,
  createLocation,
  deleteLocation,
} = require("../../controller/adminController/locationController");
const { authMiddleware, adminMiddleware } = require("../../Middleware/authMiddleware");
const locationRouter = express.Router();

locationRouter.get("/",authMiddleware,adminMiddleware, getAllLocations);
locationRouter.post("/",authMiddleware,adminMiddleware, createLocation);
locationRouter.delete("/:id",authMiddleware,adminMiddleware, deleteLocation);


module.exports = locationRouter;
