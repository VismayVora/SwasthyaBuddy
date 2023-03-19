import axios from "axios";
import React, { useState } from "react";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import html2canvas from "html2canvas";
import FormData from "form-data";
const OCR = () => {
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
  };
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={() => sendFile2()}>Get Data</button>
    </div>
  );
};

export default OCR;
