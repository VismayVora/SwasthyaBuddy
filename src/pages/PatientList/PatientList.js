import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
// import users from './user';
const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(undefined);

  const API_URL = "http://localhost:4000/api/reports/doctor";

  useEffect(() => {
    const email = localStorage.getItem("email");

    async function getPatients() {
      const response = await axios.post(API_URL, { email });
      // console.log(response)
      const users = response.data.data;
      console.log(users);
      setPatients(users);
    }

    getPatients();
  }, []);

  const handlePatient = (user) => {
    navigate("/reports/", { state: { email: user.patient_email } });
  };

  // const email = localStorage.getItem("email")
  // const handlePatients = async (e) => {
  //     const response = await axios.post(API_URL, { email })
  //     const users = response.data.data
  //     return users
  // }

  return (
    <div>
      <Navbar value="Sign-out" />
      <div className="m-5">
        <h6 className="text-5xl font-bold text-[#1678F2] my-5">Patients:</h6>
        <div className="shadow-sm p-3 flex justify-between">
          <h3 className="font-bold">Name</h3>
          <h3 className="font-bold">Patient Contact</h3>
          <h3 className="font-bold">Disorder</h3>
        </div>
        {patients?.length > 0 ? (
          patients.map((user) => (
            <div key={user._id}>
              <div
                className="shadow-sm p-3 flex justify-between cursor-pointer"
                onClick={() => handlePatient(user)}
              >
                <h3>{user.patient_name}</h3>
                <h3>{user.patient_email}</h3>
                <h3
                  style={{
                    width: "50ch",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user.disorder}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default PatientList;
