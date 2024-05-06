import express from "express";
import analyzeSentimentForBatch from "../services/analyzeSentimentForBatch.js";
import getSuggestions from "../services/getSuggestions.js";
import getComments from "../services/getComments.js";
import categorizeSuggestions from "./categorizedSuggestions.js";
import categorizeComments from "./categorizeComments.js";
import formatData from "../services/formatSentimentData.js";

const app = express();

// Route to perform sentiment analysis and return results
app.get("/sentiment", async (req, res) => {
  try {
    const restaurant_id = req.query.hotelID;
    const comments = await getComments(restaurant_id);

    const suggestions = await getSuggestions(restaurant_id);
   
    // Perform sentiment analysis on comments and suggestions
    console.log(comments);
    console.log(suggestions);
    const commentSentiments = analyzeSentimentForBatch(comments);
    const suggestionSentiments = analyzeSentimentForBatch(suggestions);
    const categorizedComments = await categorizeComments(commentSentiments);
    const categorizedSuggestions = await categorizeSuggestions(
      suggestionSentiments
    );

    const inputData = {
      categorizedComments: categorizedComments,
      categorizedSuggestions: categorizedSuggestions,
    };

    const formattedData = formatData(inputData);
    console.log("ROUTE 3: FETCHED DATA SUCCESSFULLY FOR HOSTEL ID : ", restaurant_id);
    res.status(200).json({ formattedData });
  } catch {
    console.error("Error calculating total rating:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default app;
