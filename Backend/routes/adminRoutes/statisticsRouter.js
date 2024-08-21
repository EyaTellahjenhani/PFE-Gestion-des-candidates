const express = require("express");
const { authMiddleware, adminMiddleware } = require("../../Middleware/authMiddleware");
const { getStatistics } = require("../../controller/adminController/statisticsController");

const statisticsRouter = express.Router();

statisticsRouter.get("/",authMiddleware,adminMiddleware,getStatistics);

module.exports = statisticsRouter;