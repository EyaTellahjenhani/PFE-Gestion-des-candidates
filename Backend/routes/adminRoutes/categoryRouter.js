const express = require("express");
const { authMiddleware, adminMiddleware } = require("../../Middleware/authMiddleware");
const { getAllCategory, createCategory, deleteCategory } = require("../../controller/adminController/categoryController");

const categoryRouter = express.Router();

categoryRouter.get("/",authMiddleware,adminMiddleware, getAllCategory);
categoryRouter.post("/",authMiddleware,adminMiddleware, createCategory);
categoryRouter.delete("/:id",authMiddleware,adminMiddleware, deleteCategory);

module.exports = categoryRouter;