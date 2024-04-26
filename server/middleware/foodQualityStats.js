import connectToDatabase from '../db/postgresClient.js';
import express from 'express';

const app = express();

app.get('/foodqualitystats', async (req, res) =>{
  try {

    // Connect to the database
    const db = connectToDatabase();

    // Columns for which to calculate coefficient of variance
    const columns = ['taste', 'texture', 'presentation', 'freshness', 'aroma', 'portion_size', 'value_for_money', 'healthiness'];

    // Object to store coefficient of variance for each column
    const coefficientOfVariances = {};

    // Calculate coefficient of variance for each column
    for (const column of columns) {
      const query = `SELECT ${column} FROM food_feedback`;
      const result = await db.query(query);
      const columnValues = result.rows.map(row => row[column]);

      // Calculate mean
      const mean = columnValues.reduce((acc, val) => acc + val, 0) / columnValues.length;

      // Calculate variance
      const variance = columnValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / columnValues.length;

      // Calculate standard deviation
      const standardDeviation = Math.sqrt(variance);

      // Calculate coefficient of variance
      const coefficientOfVariance = 100-(standardDeviation / mean) * 100; // Convert to percentage

      // Store coefficient of variance for the column
      coefficientOfVariances[column] = coefficientOfVariance;
    }
    const convertedData = Object.entries(coefficientOfVariances).map(([label, value]) => ({
      coefficientOfVariance: value,
      label,
    }));
    
    // Log or return the coefficient of variances for each column
    console.log('Coefficient of Variances (Percentage):', convertedData);
    res.status(200).json({ convertedData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate coefficient of variance.' });
  }  
});

export default app;
