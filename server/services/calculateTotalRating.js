function calculateTotalRating(data) {
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

  return weightedAverage.toFixed(2); // Return total rating rounded to two decimal places
}

// Function to calculate average rating
function calculateAverageRating(ratings) {
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return sum / ratings.length;
}

// Sample dataset (replace with your actual dataset)
const data = [
  {"food_quality": 4, "cleanliness": 5, "menu_variety": 4, "staff_friendliness": 5, "overall_satisfaction": 4},
  {"food_quality": 3, "cleanliness": 4, "menu_variety": 4, "staff_friendliness": 5, "overall_satisfaction": 4},
  // Add more data entries as needed
];

// Calculate total rating
const totalRating = calculateTotalRating(data);
console.log("Total Rating (Weighted Average):", totalRating);
