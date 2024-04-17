import express from 'express';
import analyzeSentimentForBatch from '../services/analyzeSentimentForBatch.js';
import getSuggestions from '../services/getSuggestions.js';
import getComments from '../services/getComments.js';
import categorizeSuggestions from './categorizedSuggestions.js';
import categorizeComments from './categorizeComments.js';
import formatData from '../services/formatSentimentData.js';

const app = express();



// Route to perform sentiment analysis and return results
app.get('/sentiment',async (req, res) => {
  const comments = await getComments();
  // console.log("Com d",comments);

  const suggestions = await getSuggestions();
  // console.log("Sug D" ,suggestionsData);
  // Perform sentiment analysis on comments and suggestions
   

  const commentSentiments = analyzeSentimentForBatch(comments);
  const suggestionSentiments = analyzeSentimentForBatch(suggestions);
  const categorizedComments = await categorizeComments(commentSentiments);
  const categorizedSuggestions = await categorizeSuggestions(suggestionSentiments);

  const inputData = {
  categorizedComments: categorizedComments,
  categorizedSuggestions: categorizedSuggestions,
};

  const formattedData =  formatData(inputData);


  res.json({ formattedData });
});

export default app;


