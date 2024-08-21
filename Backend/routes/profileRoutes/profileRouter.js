const express = require("express");
const { authMiddleware } = require("../../Middleware/authMiddleware");
const {
  getUserInformation,
  updateUserInformation,
  changePassword,
} = require("../../controller/profileController/profileController");
const profileRouter = express.Router();

profileRouter.get("/", authMiddleware, getUserInformation);
profileRouter.put("/update", authMiddleware, updateUserInformation);
profileRouter.put("/changepassword", authMiddleware, changePassword);


module.exports = profileRouter;
