const axios = require("axios");
const Report = require("../models/report.model");
const {
  HttpApiResponse,
  HandleError,
  HttpErrorResponse,
} = require("../utils/utils");

async function getDoctorReports(req, res) {
  const { email } = req.body;
  try {
    const reports = await Report.find({ ref_doctor_email: email }).lean();
    // console.log(reports);
    if (reports) {
      return res.send(HttpApiResponse(reports));
    } else {
      return res.send(HttpErrorResponse("Cannot find reports!"));
    }
  } catch (error) {
    return res.send(HttpErrorResponse(error.message));
  }
}

//get patients reports
async function getPatientReports(req, res) {
  const { email } = req.body;
  try {
    const reports = await Report.find({ patient_email: email }).lean();
    if (reports) {
      return res.send(HttpApiResponse(reports));
    } else {
      return res.send(HttpErrorResponse("Cannot find reports!"));
    }
  } catch (error) {
    return res.send(HttpErrorResponse(error.message));
  }
}

//get hospitals
async function getHospitals(req, res) {
  const { lat, lng } = req.body;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=1500&type=hospital&key=AIzaSyBJW5dQc0jq1gajvy7MkH1JmxYRgHgCTk4`,
    headers: {
      Accept: "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });

}

module.exports = { getDoctorReports, getPatientReports, getHospitals };
