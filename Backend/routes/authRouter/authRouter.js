const express = require("express");
const { register, confirmeEmail, login, forgotPassword, resetPassword, logout } = require("../../controller/authController/authController");
const authRouter = express.Router();

authRouter.post("/signup", register);

authRouter.get("/confirme/:token", confirmeEmail);

authRouter.post("/login", login);


authRouter.post("/password/forgot", forgotPassword);

authRouter.put("/password/reset/:token", resetPassword);

authRouter.get("/logout", logout);

module.exports = authRouter;
