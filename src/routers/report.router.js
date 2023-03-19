const {
  getDoctorReports,
  getPatientReports,
  getHospitals,
} = require("../controller/reports.controller");

const reportRouter = require("express").Router();

reportRouter.post("/hospital", getHospitals);
reportRouter.post("/doctor", getDoctorReports);
reportRouter.post("/patient", getPatientReports);

module.exports = reportRouter;
