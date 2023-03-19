const { getAverageData } = require("../controller/dashboard.controller");
const dashboardRouter = require("express").Router();

dashboardRouter.post("/all", getAverageData);
module.exports = dashboardRouter;
