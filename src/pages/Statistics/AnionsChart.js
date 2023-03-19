import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const AnionsChart = ({ Cl, Lactate, Phos, Prot, HCO3, UnmeasuredAnions }) => {
  return (
    <BarChart
      width={250}
      height={300}
      data={[
        {
          name: "Anions",
          Cl: Cl,
          Lactate: Lactate,
          Phos: Phos,
          Prot: Prot,
          HCO3: HCO3,
          UnmeasuredAnions: UnmeasuredAnions,
        },
      ]}
    >
      <CartesianGrid />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="Cl" stackId="a" fill="#8884d8" />
      <Bar dataKey="Lactate" stackId="a" fill="#82ca9d" />
      <Bar dataKey="Phos" stackId="a" fill="#82ca77" />
      <Bar dataKey="Prot" stackId="a" fill="#00ffff" />
      <Bar dataKey="HCO3" stackId="a" fill="#1b4d3e" />
      <Bar dataKey="UnmeasuredAnions" stackId="a" fill="#c3e8de" />
    </BarChart>
  );
};

export default AnionsChart;
