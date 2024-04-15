import express from 'express';
import selectQuantitativeData from '../services/selectQuantitativeData.js';

const app = express();

// Sample data
// const data = [
//   { "id": 1, "food_quality": 4, "cleanliness": 5, "menu_variety": 3, "staff_friendliness": 4, "age": 30, "length_of_stay": 5, "overall_satisfaction": 4 },
//   { "id": 2, "food_quality": 5, "cleanliness": 4, "menu_variety": 4, "staff_friendliness": 5, "age": 25, "length_of_stay": 3, "overall_satisfaction": 5 },
//   // Add more data objects here
// ];

// Function to calculate mean
const calculateMean = (values) => values.reduce((acc, val) => acc + val, 0) / values.length;

// Function to calculate median
const calculateMedian = (sortedValues) => sortedValues.length % 2 === 0
  ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
  : sortedValues[Math.floor(sortedValues.length / 2)];

// Function to calculate mode
const calculateMode = (values) => {
  const counts = {};
  values.forEach((val) => counts[val] ? counts[val]++ : counts[val] = 1);
  return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
};

// Function to calculate standard deviation
const calculateStandardDeviation = (values, mean) => {
  const squaredDifferences = values.map((val) => Math.pow(val - mean, 2));
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / values.length;
  return Math.sqrt(variance);
};

// Function to calculate coefficient of variation
const calculateCoefficientOfVariation = (standardDeviation, mean) => (standardDeviation / mean) * 100;

// Calculate summary statistics
app.get('/statistics',async (req, res) => {
  const data = await selectQuantitativeData();
  // console.log("UserData: ", userData);
  const numericalFields = ["food_quality", "cleanliness", "menu_variety", "staff_friendliness", "age", "length_of_stay", "overall_satisfaction"];
  const statistics = {};

  numericalFields.forEach((field) => {
    const values = data.map((entry) => entry[field]);
    const mean = calculateMean(values);
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = calculateMedian(sortedValues);
    const mode = calculateMode(values);
    const standardDeviation = calculateStandardDeviation(values, mean);
    const coefficientOfVariation = calculateCoefficientOfVariation(standardDeviation, mean);

    statistics[field] = { mean, median, mode, standardDeviation, coefficientOfVariation };
  });

  // console.log(statistics);
  res.json(statistics);
});

export default app;
