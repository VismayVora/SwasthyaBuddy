import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
const API_URL = "http://localhost:4000/api/acid-base/predict";
const normalValues = [
  {
    label: "pH",
    value: "7.38-7.44",
  },
  {
    label: "PaCO2",
    value: "38-42",
  },
  {
    label: "HCO3",
    value: "23-28",
  },
  {
    label: "Na",
    value: "136-145",
  },
  {
    label: "K",
    value: "3.6-5.2",
  },
  {
    label: "Cl",
    value: "98-106",
  },
  {
    label: "Albumin",
    value: "3.5-5.5",
  },
  {
    label: "Lactate",
    value: "0.5-2.22",
  },
];
const AcidBaseDisorder = () => {
  const [file, setFile] = useState({});

  const sendFile2 = async () => {
    console.log(file);
    let data = new FormData();
    data.append("myfile", file, file.name);
    const res = await axios.post("http://127.0.0.1:5000/ocr", data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US, en;q=0.8",
        "Content-Type": `multipart/form-data`,
      },
    });
    console.log(res.data);
    const ans = res.data;
    Object.keys(ans).map((key, index) => {
      if (key.toLocaleLowerCase() === "na") {
        setNa(ans[key]);
      }
      if (key.toLocaleLowerCase() === "ph") {
        setpH(ans[key]);
      }
      if (key.toLocaleLowerCase() === "pco2") {
        if (parseInt(ans[key]) < 25) {
          setCO2(parseFloat(ans[key]) * 7.50062);
        } else {
          setCO2(parseFloat(ans[key]));
        }
      }
      if (key.toLocaleLowerCase() === "hco3") {
        setHCO3(ans[key]);
      }
      if (key.toLocaleLowerCase() === "k") {
        setK(ans[key]);
      }
      if (key.toLocaleLowerCase() === "cl") {
        setCl(ans[key]);
      }
    });
  };
  const [pData, setPData] = useState([
    {
      label: "pH",
      value: 7.4,
    },
    {
      label: "PaCO2",
      value: 40,
    },
    {
      label: "HCO3",
      value: 24,
    },
    {
      label: "Na",
      value: 140,
    },
    {
      label: "K",
      value: 4.4,
    },
    {
      label: "Cl",
      value: 100,
    },
    {
      label: "Albumin",
      value: 4.4,
    },
    {
      label: "Lactate",
      value: 1.35,
    },
  ]);
  const [pH, setpH] = useState("");
  const [CO2, setCO2] = useState("");
  const [HCO3, setHCO3] = useState("");
  const [Na, setNa] = useState("");
  const [K, setK] = useState("");
  const [Cl, setCl] = useState("");
  const [weight, setWeight] = useState("");
  const [albumin, setAlbumin] = useState("");
  const [lactate, setLactate] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [report, setReport] = useState({});
  const determineDisorder = async () => {
    setPData([
      {
        label: "pH",
        value: pH,
      },
      {
        label: "PaCO2",
        value: CO2,
      },
      {
        label: "HCO3",
        value: HCO3,
      },
      {
        label: "Na",
        value: Na,
      },
      {
        label: "K",
        value: K,
      },
      {
        label: "Cl",
        value: Cl,
      },
      {
        label: "Albumin",
        value: albumin,
      },
      {
        label: "Lactate",
        value: lactate,
      },
    ]);

    console.log({
      pH: pH,
      CO2: CO2,
      HCO3: HCO3,
      Na: Na,
      K: K,
      Cl: Cl,
      weight: weight,
      Albumin: albumin,
      Lactate: lactate,
      patient_name: patientName,
      patient_email: patientEmail,
      ref_doctor_email: "atharvakinikar@gmail.com",
    });
    const response = await axios.post(API_URL, {
      pH: parseFloat(pH),
      CO2: parseFloat(CO2),
      HCO3: parseFloat(HCO3),
      Na: parseFloat(Na),
      K: parseFloat(K),
      Cl: parseFloat(Cl),
      weight: parseFloat(weight),
      Albumin: parseFloat(albumin),
      Lactate: parseFloat(lactate),
      patient_name: patientName,
      patient_email: patientEmail,
      ref_doctor_email: localStorage.getItem("email"),
    });
    console.log(response);
    console.log(Object.keys(report).length);
    const ans = response.data.data;
    setReport(ans);
    window.scrollBy(0, 200);
    // setpH("");
    // setCO2("");
    // setHCO3("");
    // setNa("");
    // setK("");
    // setCl("");
    // setWeight("");
    // setAlbumin("");
    // setLactate("");
  };
  const getLabelName = (label) => {
    let words = label.split("_");
    let finalLabel = "";
    words.forEach((word) => {
      finalLabel += word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return finalLabel;
  };
  const downloadPdf = () => {
    const report = document.getElementById("report");
    html2canvas(report).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("report.pdf");
    });
  };
  const calculateColor = (label, value) => {
    switch (label) {
      case "pH":
        if (value < 7.38) {
          return "font-bold text-teal-500";
        } else if (value > 7.44) {
          return "font-bold text-red-600";
        }
        return "";
      case "PaCO2":
        if (value < 38) {
          return "font-bold text-teal-500";
        } else if (value > 42) {
          return "font-bold text-red-600";
        }
        return "";
      case "HCO3":
        if (value < 23) {
          return "font-bold text-teal-500";
        } else if (value > 28) {
          return "font-bold text-red-600";
        }
        return "";
      case "Na":
        if (value < 136) {
          return "font-bold text-teal-500";
        } else if (value > 145) {
          return "font-bold text-red-600";
        }
        return "";
      case "K":
        if (value < 3.6) {
          return "font-bold text-teal-500";
        } else if (value > 5.2) {
          return "font-bold text-red-600";
        }
        return "";
      case "Cl":
        if (value < 98) {
          return "font-bold text-teal-500";
        } else if (value > 105) {
          return "font-bold text-red-600";
        }
        return "";
      case "Albumin":
        if (value < 3.5) {
          return "font-bold text-teal-500";
        } else if (value > 5.5) {
          return "font-bold text-red-600";
        }
        return "";
      case "Lactate":
        if (value < 0.5) {
          return "font-bold text-teal-500";
        } else if (value > 2.2) {
          return "font-bold text-red-600";
        }
        return "";
      default:
        return "";
    }
  };
  return (
    <>
      <Navbar value="Sign-Out" />
      <div className="py-8 px-16">
        <h1 className="text-3xl font-bold text-[#3A8EF6]">
          Determine Acid Base Disorders
        </h1>
        {/* <div className="flex justify-around items-center">
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter Patient Name</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded"
            placeholder="eg. Manan Shah"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter Patient Email</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded"
            placeholder="eg. manan@gmail.com"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
          />
        </div>
      </div> */}
        <div className="mt-4 p-4 max-w-[90%] grid grid-cols-2 mr-auto ml-auto">
          <div className="flex flex-col">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button
              className="font-bold text-white bg-[#3A8EF6] px-8 py-2 rounded w-fit mt-4"
              onClick={() => sendFile2()}
            >
              Get Data
            </button>
          </div>
          <div className="mr-8 mt-4">
            <h1 className="font-semibold text-lg">Enter Patient Name</h1>
            <input
              className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
              placeholder="eg. Manan Shah"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <div className="mr-8 mt-4">
            <h1 className="font-semibold text-lg">Enter Patient Email</h1>
            <input
              className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
              placeholder="eg. manan@gmail.com"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
            />
          </div>
          <div className="mr-8 mt-4">
            <h1 className="font-semibold text-lg">Enter pH value</h1>
            <input
              className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
              placeholder="eg. 7.6"
              type={"number"}
              value={pH}
              onChange={(e) => setpH(e.target.value)}
            />
            <span className="ml-2 text-sm text-slate-600">num</span>
          </div>
          <div className="mr-8 mt-4">
            <h1 className="font-semibold text-lg">Enter PaCO2 value</h1>
            <input
              className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
              placeholder="eg. 23"
              type={"number"}
              value={CO2}
              onChange={(e) => setCO2(e.target.value)}
            />
            <span className="ml-2 text-sm text-slate-600">mmHg</span>
          </div>
          <div className="mr-8 mt-4">
            <h1 className="font-semibold text-lg">Enter HCO3 value</h1>
            <input
              className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
              placeholder="eg. 10"
              type={"number"}
              value={HCO3}
              onChange={(e) => setHCO3(e.target.value)}
            />
            <span className="ml-2 text-sm text-slate-600">mmol/L</span>
          </div>
          <div className="mr-8 mt-4">
            <h1 className="font-semibold text-lg">Enter Na+ value</h1>
            <input
              className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
              placeholder="eg. 140"
              type={"number"}
              value={Na}
              onChange={(e) => setNa(e.target.value)}
            />
            <span className="ml-2 text-sm text-slate-600">mmol/L</span>
          </div>
          <div className="mr-8 mt-4">
            <h1 className="font-semibold text-lg">Enter K+ value</h1>
            <input
              className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
              placeholder="eg. 0"
              type={"number"}
              value={K}
              onChange={(e) => setK(e.target.value)}
            />
            <span className="ml-2 text-sm text-slate-600">mmol/L</span>
          </div>
          <div className="mr-8 mt-4">
            <h1 className="font-semibold text-lg">Enter Cl- value</h1>
            <input
              className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
              placeholder="eg. 100"
              type={"number"}
              value={Cl}
              onChange={(e) => setCl(e.target.value)}
            />
            <span className="ml-2 text-sm text-slate-600">mmol/L</span>
          </div>
          <div className="mr-8 mt-4">
            <h1 className="font-semibold text-lg">Enter Lactate value</h1>
            <input
              className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
              placeholder="eg. 11"
              type={"number"}
              value={lactate}
              onChange={(e) => setLactate(e.target.value)}
            />
            <span className="ml-2 text-sm text-slate-600">mmol/L</span>
          </div>
          <div className="mr-8 mt-4">
            <h1 className="font-semibold text-lg">Enter Albumin value</h1>
            <input
              className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
              placeholder="eg. 21"
              type={"number"}
              value={albumin}
              onChange={(e) => setAlbumin(e.target.value)}
            />
            <span className="ml-2 text-sm text-slate-600">g/L</span>
          </div>
          <div className="mr-8 mt-4">
            <h1 className="font-semibold text-lg">Enter weight value in kgs</h1>
            <input
              className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
              placeholder="eg. 34"
              type={"number"}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <span className="ml-2 text-sm text-slate-600">kg</span>
          </div>
        </div>
        <div className="mt-4 max-w-[100px] ml-auto mr-[180px]">
          <button
            onClick={() => determineDisorder()}
            className="font-bold text-white bg-[#3A8EF6] px-8 py-2 rounded"
          >
            Submit
          </button>
        </div>
        {Object.keys(report).length > 0 ? (
          <div className="mt-4 p-4 max-w-[80%] mr-auto ml-auto">
            <div id="report" className="p-4 w-[100%]">
              <h1 className="text-3xl font-bold text-[#1678F2] mb-4">Report</h1>
              <div className="flex flex-wrap max-w-[700px] justify-between">
                {Object.keys(report).map((key, index) => {
                  return (
                    <div key={key} className="flex mb-4 mr-4  ">
                      <h1 className="font-bold text-xl">
                        {getLabelName(key)}:{" "}
                      </h1>

                      <h1 className="font-bold text-xl ml-2 text-[#6B40F9] max-w-[700px]">
                        {" "}
                        {report[key]}
                      </h1>
                    </div>
                  );
                })}
              </div>

              <table className="table-auto border border-black mb-4">
                <thead>
                  <tr>
                    <td className="border border-black p-2 font-bold">
                      Factors
                    </td>
                    <td className="border border-black p-2 font-bold">
                      Normal Values
                    </td>
                    <td className="border border-black p-2 font-bold">
                      Patient's Values
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {pData.map((p, index) => (
                    <tr key={index}>
                      <td className="border border-black py-2 px-8 font-semibold">
                        {p.label}
                      </td>
                      <td className="border border-black py-2 px-8">
                        {normalValues[index].value}
                      </td>
                      <td
                        className={`border border-black py-2 px-8 ${calculateColor(
                          p.label,
                          p.value
                        )}`}
                      >
                        {p.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <table className="table-auto border border-black">
              <tbody>
                {Object.keys(report).map((key, index) => {
                  return (
                    <tr key={index}>
                      <td className="border border-black p-2">
                        <h1 className="font-bold text-lg" key={key}>
                          {getLabelName(key)}
                        </h1>
                      </td>
                      <td className="border border-black p-2 max-w-[600px]">
                        <h1 className="ml-2 text-lg"> {report[key]}</h1>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table> */}
            </div>

            <button
              onClick={() => downloadPdf()}
              className="mt-4 ml-4 font-bold text-white bg-[#6B40F9] px-8 py-2 rounded"
            >
              Download Report
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AcidBaseDisorder;
