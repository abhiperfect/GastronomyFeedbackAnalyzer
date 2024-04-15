import Sentiment from 'sentiment';

// Initialize sentiment analyzer
const sentiment = new Sentiment();

// Function to perform sentiment analysis on multiple comments and suggestions
const analyzeSentimentForBatch = (texts) => {
  const results = [];
  texts.forEach((text, index) => {
    const result = sentiment.analyze(text);
    results.push({ index: index + 1, text, ...result });
  });
  return results;
};

export default analyzeSentimentForBatch;
