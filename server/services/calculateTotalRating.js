import selectQuantitativeData from "./selectQuantitativeData.js";

export default async function calculateTotalRating(req, res) {
  try {
    // Fetch quantitative data
    const data = await selectQuantitativeData();
    // Calculate average rating for each criterion
    const averageRatings = {
      food_quality: calculateAverageRating(data.map(entry => entry.food_quality)),
      cleanliness: calculateAverageRating(data.map(entry => entry.cleanliness)),
      menu_variety: calculateAverageRating(data.map(entry => entry.menu_variety)),
      staff_friendliness: calculateAverageRating(data.map(entry => entry.staff_friendliness)),
      overall_satisfaction: calculateAverageRating(data.map(entry => entry.overall_satisfaction)),
    };

    // Weighted average calculation (optional)
    // Adjust weights based on importance (sum of weights should be 1)
    const weightedAverage =
      (averageRatings.food_quality * 0.3) +
      (averageRatings.cleanliness * 0.2) +
      (averageRatings.menu_variety * 0.2) +
      (averageRatings.staff_friendliness * 0.2) +
      (averageRatings.overall_satisfaction * 0.1);

    // Round up the weightedAverage to the nearest integer
    const roundedRating = Math.ceil(weightedAverage);

    // Send the rounded rating back as the response
    res.send( {rating: roundedRating.toString(), totalFeedback: data.length});
  } catch (error) {
    // Handle errors
    console.error("Error calculating total rating:", error);
    res.status(500).send("Internal Server Error");
  }
}

// Function to calculate average rating
function calculateAverageRating(ratings) {
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return sum / ratings.length;
}
