import { useState } from "react";
import { Data } from "./Data";
import PieChart from "./PieChart";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
export default function App() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.compound), 
    datasets: [
      {
        label: "Average Analysis",
        data: Data.map((data) => data.compound),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });



  return (
    <div className="App">
      <PieChart chartData={chartData} />
    </div>
  );
}