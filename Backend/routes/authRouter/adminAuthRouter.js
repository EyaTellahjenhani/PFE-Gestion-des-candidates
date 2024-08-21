const express = require("express");
const { adminLogin, addAdminAccount, getAllAdmin } = require("../../controller/authController/adminAuthController");
const { authMiddleware, adminMiddleware } = require("../../Middleware/authMiddleware");

const adminAuthRouter = express.Router();


adminAuthRouter.post("/login", adminLogin);
adminAuthRouter.post("/add",authMiddleware,adminMiddleware,addAdminAccount)
adminAuthRouter.get("/all",authMiddleware,adminMiddleware,getAllAdmin)



module.exports = adminAuthRouter;
