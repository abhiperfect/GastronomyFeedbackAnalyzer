// Import necessary modules
import express from "express";
import connectToDatabase from "../db/postgresClient.js";

// Create Express app
const app = express();
// Function to calculate food quality statistics for each category
const calculateCategoryStats = (feedbackData) => {
  // Initialize an object to store counts for each category
  const categoryCounts = {};

  // Loop through feedback data to calculate counts for each category
  feedbackData.forEach((feedback) => {
    // Exclude 'id' attribute
    const { id, ...categoryValues } = feedback;

    // Loop through category values to calculate counts
    for (const [category, value] of Object.entries(categoryValues)) {
      // Initialize count for the category if not already present
      if (!categoryCounts[category]) {
        categoryCounts[category] = { total: 0, good: 0 };
      }
      
      // Increment total count for the category
      categoryCounts[category].total++;

      // Check if the value is considered good
      if (value >= 3) {
        // Increment good count for the category
        categoryCounts[category].good++;
      }
    }
  });

  // Calculate percentage for each category
  const convertedData = Object.entries(categoryCounts).map(([category, counts]) => ({
    label: category,
    value: (counts.good / counts.total) * 100 || 0, // Calculate percentage, handle division by zero
  }));

  // Return the converted data
  return convertedData;
};

// Endpoint to calculate food quality statistics
app.get("/foodqualitystats", async (req, res) => {
  try {
    // Extract hotelID from query parameters
    const hotelID = req.query.hotelID;

    // Connect to the PostgreSQL database
    const db = await connectToDatabase();

    // SQL query to join tables and retrieve relevant data
    const query = `
      SELECT 
        ff.* 
      FROM 
        food_feedback ff
      JOIN 
        restaurant_customer_feedback rcf ON ff.id = rcf.food_feedback_id
      WHERE 
        rcf.restaurant_id = $1`;

    // Execute the query with the hotelID parameter
    const result = await db.query(query, [hotelID]);
    // If there are no results, return an empty array
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No feedback found for the provided hotelID." });
      }
      
      // Extract feedback data from the result
      const feedbackData = result.rows;
  
      const convertedData = calculateCategoryStats(feedbackData);
    // Log or return the feedback data
    // const coefficientOfVariances = {};

    // // Calculate coefficient of variance for each column
    // for (const column in feedbackData[0]) {
    //   if (column !== "id") {
    //     const columnValues = feedbackData.map((item) => item[column]);

    //     // Calculate mean
    //     const mean =
    //       columnValues.reduce((acc, val) => acc + val, 0) / columnValues.length;

    //     // Calculate variance
    //     const variance =
    //       columnValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
    //       columnValues.length;

    //     // Calculate standard deviation
    //     const standardDeviation = Math.sqrt(variance);

    //     // Calculate coefficient of variance
    //     const coefficientOfVariance = 100 - (standardDeviation / mean) * 100; // Convert to percentage

    //     // Store coefficient of variance for the column
    //     coefficientOfVariances[column] = coefficientOfVariance;
    //   }
    // }

    // // Convert data to desired format
    // const convertedData = Object.entries(coefficientOfVariances).map(
    //   ([label, value]) => ({
    //     coefficientOfVariance: value,
    //     label,
    //   })
    // );

    // console.log("ROUTE 1: FETCHED DATA SUCCESSFULLY FOR HOTEL ID: ",hotelID);
    // res.status(200).json({ convertedData });
    res.status(200).json({ convertedData });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to calculate coefficient of variance.",
      });
  }
});

// Export the Express app
export default app;
