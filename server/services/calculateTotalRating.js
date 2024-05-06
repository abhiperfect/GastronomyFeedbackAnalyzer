import connectToDatabase from "../db/postgresClient.js";

export default async function calculateTotalRating(req, res) {
  const db = await connectToDatabase();
  try {
    const restaurant_id = req.query.hotelID;
    const query = `
      SELECT ff.food_quality, ff.cleanliness, ff.menu_variety, ff.staff_friendliness, ff.overall_satisfaction
      FROM feedback ff
      JOIN restaurant_customer_feedback rcf ON ff.id = rcf.feedback_id
      WHERE rcf.restaurant_id = $1
    `;

    // Execute the query with the restaurant ID as a parameter
    const result = await db.query(query, [restaurant_id]);
    const data = result.rows;

    const averageRatings = {
      food_quality: calculateAverageRating(
        data.map((entry) => entry.food_quality)
      ),
      cleanliness: calculateAverageRating(
        data.map((entry) => entry.cleanliness)
      ),
      menu_variety: calculateAverageRating(
        data.map((entry) => entry.menu_variety)
      ),
      staff_friendliness: calculateAverageRating(
        data.map((entry) => entry.staff_friendliness)
      ),
      overall_satisfaction: calculateAverageRating(
        data.map((entry) => entry.overall_satisfaction)
      ),
    };


    const weightedAverage =
      averageRatings.food_quality * 0.3 +
      averageRatings.cleanliness * 0.2 +
      averageRatings.menu_variety * 0.2 +
      averageRatings.staff_friendliness * 0.2 +
      averageRatings.overall_satisfaction * 0.1;


    const roundedRating = Math.ceil(weightedAverage);
    console.log("ROUTE 2: FETCHED DATA SUCCESSFULLY FOR HOTEL ID: ", restaurant_id);
    res.status(200).send({ rating: roundedRating.toString(), totalFeedback: data.length });
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
