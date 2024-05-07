import express from "express";
import connectToDatabase from "../db/postgresClient.js";

const app = express();

app.get("/statistics", async (req, res) => {
  // Extract hotelID from query parameters
  const hotelID = req.query.hotelID;

  // Connect to the PostgreSQL database
  const db = await connectToDatabase();

  // SQL query to join tables and retrieve relevant data
  const query = `
    SELECT ff.food_quality, ff.cleanliness, ff.menu_variety, ff.staff_friendliness, ff.overall_satisfaction
    FROM feedback ff
    JOIN restaurant_customer_feedback rcf ON ff.id = rcf.feedback_id
    WHERE rcf.restaurant_id = $1`;

  try {
    // Execute the query with the hotelID parameter
    const result = await db.query(query, [hotelID]);
    const data = result.rows;

    if (data.length === 0) {
      // If no data found for the hotel ID, return an error response
      return res.status(404).json({ error: "No data found for the given hotel ID" });
    }

    // Calculate statistics for feedback data
    const feedbackStats = calculateFeedbackStatistics(data);

    // Send response with calculated statistics
    res.status(200).json(feedbackStats);
  } catch (error) {
    // Handle any database errors
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to calculate statistics for feedback data
const calculateFeedbackStatistics = (data) => {
  const totalFeedbacks = data.length;
  const feedbackStats = [];

  // Define threshold for considering feedback as good
  const threshold = 3;

  // Loop through numerical fields to calculate statistics
  for (const field in data[0]) {
    if (field !== 'id') {
      const fieldData = data.map((item) => item[field]);
      const goodCount = fieldData.filter((value) => value >= threshold).length;
      const percentageGood = (goodCount / totalFeedbacks) * 100;

      // Categorize feedback as good or bad based on threshold
      const label = percentageGood >= 50 ? "Good" : "Bad";

      // Push statistics for the field to feedbackStats array
      feedbackStats.push({ label, value: percentageGood, label: field.replace(/_/g, ' ') });
    }
  }

  return feedbackStats;
};

export default app;
