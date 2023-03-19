import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const PredictSeverity = () => {
  const [inputData, setInputData] = useState({
    AGE: "",
    FEV1: "",
    FEV1PRED: "",
    FVC: "",
    FVCPRED: "",
    SGRQ: "",
    AGEquartiles: "",
    gender: "",
    smoking: "",
    Diabetes: "",
    muscular: "",
    hypertension: "",
    AtrialFib: "",
    IHD: "",
  });
  const [severity, setSeverity] = useState("");
  const getPrediction = async () => {
    const response = await axios.post(
      "https://istart-ml-yfdjbh463q-uc.a.run.app/predict",
      inputData
    );
    console.log(response.data);
    switch (response.data) {
      case 1:
        setSeverity("Mild");
        break;
      case 2:
        setSeverity("Moderate");
        break;
      case 3:
        setSeverity("Severe");
        break;
      case 4:
        setSeverity("Very Severe");
        break;

      default:
        break;
    }
  };
  return (
    <div>
      <Navbar value="Sign-out" />
      <div className="mt-4 px-16">
        <h1 className="text-3xl font-bold text-[#3A8EF6]">
          Predict COPD Severity
        </h1>
      </div>
      <div className="mt-4 mb-4 max-w-[90%] grid grid-cols-2 mr-auto ml-auto">
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter Age</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 18"
            value={inputData.AGE}
            onChange={(e) =>
              setInputData({ ...inputData, AGE: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter FEV1</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 1.20"
            value={inputData.FEV1}
            onChange={(e) =>
              setInputData({ ...inputData, FEV1: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter FEV1PRED</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 70"
            value={inputData.FEV1PRED}
            onChange={(e) =>
              setInputData({ ...inputData, FEV1PRED: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter FVC</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 2.0"
            value={inputData.FVC}
            onChange={(e) =>
              setInputData({ ...inputData, FVC: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter FVCPRED</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 50"
            value={inputData.FVCPRED}
            onChange={(e) =>
              setInputData({ ...inputData, FVCPRED: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter SGRQ</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 40"
            value={inputData.SGRQ}
            onChange={(e) =>
              setInputData({ ...inputData, SGRQ: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter AGEquartiles</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 2"
            value={inputData.AGEquartiles}
            onChange={(e) =>
              setInputData({ ...inputData, AGEquartiles: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter gender</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 1 for male 2 for female"
            value={inputData.gender}
            onChange={(e) => {
              setInputData({ ...inputData, gender: e.target.value });
            }}
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter Smoking</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 2"
            value={inputData.smoking}
            onChange={(e) =>
              setInputData({ ...inputData, smoking: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter Diabetes</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 1 for no, 2 for yes"
            value={inputData.Diabetes}
            onChange={(e) =>
              setInputData({ ...inputData, Diabetes: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter muscular</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 1 for no, 2 for yes"
            value={inputData.muscular}
            onChange={(e) =>
              setInputData({ ...inputData, muscular: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter hypertension</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 1 for no, 2 for yes"
            value={inputData.hypertension}
            onChange={(e) =>
              setInputData({ ...inputData, hypertension: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter AtrialFib</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 1 for no, 2 for yes"
            value={inputData.AtrialFib}
            onChange={(e) =>
              setInputData({ ...inputData, AtrialFib: e.target.value })
            }
          />
        </div>
        <div className="mr-8 mt-4">
          <h1 className="font-semibold text-lg">Enter IHD</h1>
          <input
            className="mt-2 outline-none shadow shadow-slate-400 p-2 rounded min-w-[70%]"
            placeholder="eg. 1 for no, 2 for yes"
            value={inputData.IHD}
            onChange={(e) =>
              setInputData({ ...inputData, IHD: e.target.value })
            }
          />
        </div>
      </div>
      <button
        className="ml-16 mb-4 font-bold text-white bg-[#3A8EF6] px-8 py-2 rounded"
        onClick={() => getPrediction()}
      >
        Predict
      </button>
      {severity.length > 0 ? (
        <h1 className="ml-16 mb-4 text-xl font-bold">
          Your diagnosis severity is {severity}. Please consult a doctor for
          further treatment
        </h1>
      ) : null}
    </div>
  );
};

export default PredictSeverity;
