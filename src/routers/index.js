const Router = require("express").Router();
const auth = require("./auth.router");
const acid_base = require("./acid-base.router");
const reportRouter = require("./report.router");
const dashboardRouter = require("./dashboard.router");
Router.get("", (req, res) => {
  res.send("Welcome to Antons-UIA Server!");
});

Router.use("/auth", auth);
Router.use("/acid-base", acid_base);
Router.use("/reports", reportRouter);
Router.use("/dashboard", dashboardRouter);
module.exports = Router;

// Router.use("/events",events);
// Router.use("/auth",auth);