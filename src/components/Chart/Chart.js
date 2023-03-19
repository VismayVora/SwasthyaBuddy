import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart() {
  const labels = [
    "Day 01",
    "Day 02",
    "Day 03",
    "Day 04",
    "Day 05",
    "Day 06",
    "Day 07",
  ];
  const options = {
    responsive: true,
    tension: 0.3,
    plugins: {
      tooltip: {
        backgroundColor: "#000",
        yAlign: "bottom",
        mode: "x",
        padding: 15,
      },
      legend: {
        position: "",
        labels: {
          font: {
            family: "IBM Plex Sans",
            size: 0,
            weight: "bold",
          },
        },
      },
      title: {
        display: false,
        position: "top",
        text: "COPD Patients",
        align: "start",
        font: {
          family: "IBM Plex Sans",
          size: 20,
        },
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "COPD Patients diagnosed",
        data: [2,3,1,2,3,2,0],
        borderColor: "rgb(22, 120, 242)",
        backgroundColor: "rgba(22, 120, 242, 0.5)",
      }
    ],
  };
  return (
    <Line
      options={options}
      data={data}
      style={{ maxHeight: "270px", padding: "2px 15px" }}
    />
  );
}
