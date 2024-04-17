import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSentimentAnalysisContext } from "../../context/context";

export default function SentimentPieActiveArc() {
  const { sentimentAnalysis } = useSentimentAnalysisContext();

  // Check if sentimentAnalysis and sentimentAnalysis.formattedData are defined
  if (!sentimentAnalysis || !sentimentAnalysis.formattedData) {
    return null; // Or you can return some loading indicator or fallback UI
  }

  // Assuming formattedData is an array of objects with 'name' and 'value' properties
  const chartData = sentimentAnalysis.formattedData.map((item, index) => ({
    index, // Adding index property
    label: item.label,
    value: item.value,
  }));
  console.log("char data", chartData);
  return (
    <>
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={300}
      />
    </>
  );
}
