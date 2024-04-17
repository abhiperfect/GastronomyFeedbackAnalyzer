import express from "express";
import selectQuantitativeData from "../services/selectQuantitativeData.js";

const app = express();

// Mapping object for long and short notations
const notationMapping = {
  food_quality: "Food Quality",
  cleanliness: "Cleanliness",
  menu_variety: "Menu Variety",
  staff_friendliness: "Staff Friendliness",
  overall_satisfaction: "Overall",
};

function transformData(data) {
  const transformedData = Object.keys(data).map((key) => ({
    coefficientOfVariation: data[key].coefficientOfVariation,
    label: notationMapping[key], // Replace with short notation
  }));

  return transformedData;
}

// Function to calculate mean
const calculateMean = (values) =>
  values.reduce((acc, val) => acc + val, 0) / values.length;

// Function to calculate median
const calculateMedian = (sortedValues) =>
  sortedValues.length % 2 === 0
    ? (sortedValues[sortedValues.length / 2 - 1] +
        sortedValues[sortedValues.length / 2]) /
      2
    : sortedValues[Math.floor(sortedValues.length / 2)];

// Function to calculate mode
const calculateMode = (values) => {
  const counts = {};
  values.forEach((val) => (counts[val] ? counts[val]++ : (counts[val] = 1)));
  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
};

// Function to calculate standard deviation
const calculateStandardDeviation = (values, mean) => {
  const squaredDifferences = values.map((val) => Math.pow(val - mean, 2));
  const variance =
    squaredDifferences.reduce((acc, val) => acc + val, 0) / values.length;
  return Math.sqrt(variance);
};

// Function to calculate coefficient of variation
const calculateCoefficientOfVariation = (standardDeviation, mean) =>
  100 - (standardDeviation / mean) * 100;

// Calculate summary statistics
app.get("/statistics", async (req, res) => {
  const data = await selectQuantitativeData();
  const numericalFields = [
    "food_quality",
    "cleanliness",
    "menu_variety",
    "staff_friendliness",
    "overall_satisfaction",
  ];
  const statistics = {};

  numericalFields.forEach((field) => {
    const values = data.map((entry) => entry[field]);
    const mean = calculateMean(values);
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = calculateMedian(sortedValues);
    const mode = calculateMode(values);
    const standardDeviation = calculateStandardDeviation(values, mean);
    const coefficientOfVariation = calculateCoefficientOfVariation(
      standardDeviation,
      mean
    );

    statistics[field] = {
      coefficientOfVariation,
    };
  });
  const transformedData = transformData(statistics);
  console.log(transformedData);  
  res.json(transformedData);
});

export default app;
