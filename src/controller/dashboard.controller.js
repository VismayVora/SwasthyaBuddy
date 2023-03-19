const { HttpApiResponse, HttpErrorResponse } = require("../utils/utils");
const Report = require("../models/report.model");
async function getAverageData(req, res) {
  try {
    const reports = await Report.find({});
    let avgCO2 = 0,
      avgPh = 0,
      avgHCO3 = 0,
      avgNa = 0;
    reports.forEach((report) => {
      avgCO2 += report.CO2;
      avgHCO3 += report.HCO3;
      avgPh += report.pH;
      avgNa += report.Na;
    });
    const len = reports.length;
    avgCO2 /= len;
    avgHCO3 /= len;
    avgPh /= len;
    avgNa /= len;
    return res.send(
      HttpApiResponse({
        avgCO2,
        avgHCO3,
        avgPh,
        avgNa,
      })
    );
  } catch (e) {
    return res.send(HttpErrorResponse(error.message));
  }
}

module.exports = { getAverageData };
