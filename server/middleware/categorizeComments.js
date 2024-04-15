
function categorizeComments(commentSentiments) {
   
  const categorizedComments = commentSentiments.map(result => {
    const comparativeScore = result.comparative;
    let category;

    if (comparativeScore < -0.1) {
      category = "Negative";
    } else if (comparativeScore > 0.1) {
      category = "Positive";
    } else {
      category = "Neutral";
    }

    return {
      text: result.text,
      category: category
    };
  });

  return categorizedComments;
}

export default categorizeComments;
