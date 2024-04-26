// Function to calculate overall rating
const calculateOverallRating = (feedbackData) => {
  if (typeof feedbackData !== 'object' || feedbackData === null) {
    console.error('Invalid input: feedbackData must be a non-null object');
    return 0;
  }

  const aspects = ['taste', 'texture', 'presentation', 'freshness', 'aroma', 'portionSize', 'valueForMoney', 'healthiness'];

  // Calculate the total rating for all aspects
  let totalRating = 0;
  let totalAspectCount = 0;
  aspects.forEach((aspect) => {
    if (aspect in feedbackData && !isNaN(feedbackData[aspect])) {
      totalRating += parseInt(feedbackData[aspect]);
      totalAspectCount++;
    }
  });

  // Calculate the overall rating as the mean of all aspect ratings
  let overallRating = totalAspectCount > 0 ? totalRating / totalAspectCount : 0;
  overallRating = Math.round(overallRating);

  return overallRating;
};

export default calculateOverallRating;
