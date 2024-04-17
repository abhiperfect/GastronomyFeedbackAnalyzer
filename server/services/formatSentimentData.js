// Define the formatData function
export default function formatData( inputData) {

  const categorizedComments = Array.isArray(inputData.categorizedComments) ? inputData.categorizedComments : [];
  const categorizedSuggestions = Array.isArray(inputData.categorizedSuggestions) ? inputData.categorizedSuggestions : [];

  const categorizedCounts = {};

  // Count categories in comments
  categorizedComments.forEach((comment) => {
    const category = comment.category;
    if (categorizedCounts[category]) {
      categorizedCounts[category]++;
    } else {
      categorizedCounts[category] = 1;
    }
  });

  // Count categories in suggestions
  categorizedSuggestions.forEach((suggestion) => {
    const category = suggestion.category;
    if (categorizedCounts[category]) {
      categorizedCounts[category]++;
    } else {
      categorizedCounts[category] = 1;
    }
  });

  // Format data
  const formattedData = Object.entries(categorizedCounts).map(([category, count], index) => ({
    id: index,
    value: count,
    label: category,
  }));
 console.log("AA", formattedData);
  return formattedData;
}

// Input data

// Format the data
// const formattedData = formatData(inputData);
// console.log(formattedData);
