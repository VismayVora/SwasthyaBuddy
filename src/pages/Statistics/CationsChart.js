import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const CationsChart = ({ Na, Lactate, K }) => {
  return (
    <BarChart
      width={250}
      height={300}
      data={[{ name: "Cations", Na: Na, Lactate: Lactate, K: K }]}
    >
      <CartesianGrid />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="Na" stackId="a" fill="#8884d8" />
      <Bar dataKey="Lactate" stackId="a" fill="#fa7445" />
      <Bar dataKey="K" stackId="a" fill="#82ca77" />
    </BarChart>
  );
};

export default CationsChart;
