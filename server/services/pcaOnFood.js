
// Function to calculate the mean of an array
const calculateMean = (arr) => arr.reduce((acc, val) => acc + val, 0) / arr.length;

// Function to calculate the standard deviation of an array
const calculateStandardDeviation = (arr, mean) => {
  const squaredDiffs = arr.map(val => Math.pow(val - mean, 2));
  const variance = calculateMean(squaredDiffs);
  return Math.sqrt(variance);
};

// Function to calculate the coefficient of variance for each feature
const calculateCoefficientOfVariation = (data) => {
  const numFeatures = Object.keys(data[0]).length;
  const coefficientOfVariation = [];

  for (let i = 0; i < numFeatures; i++) {
    const featureValues = data.map(item => item[Object.keys(item)[i]]);
    const mean = calculateMean(featureValues);
    const stdDev = calculateStandardDeviation(featureValues, mean);
    const coefficient = 100-(stdDev / mean) * 100;
    coefficientOfVariation.push(coefficient);
  }

  return coefficientOfVariation;
};

// Calculate coefficient of variation
const coefficientOfVariation = calculateCoefficientOfVariation(data);
console.log('Coefficient of Variation:', coefficientOfVariation);
