import connectToDatabase from '../db/postgresClient.js'


const submitFeedback = async (req, res) => {
  const db = connectToDatabase();
  try {
    // Extract feedback data from the request body
    const {
      food_quality,
      cleanliness,
      menu_variety,
      staff_friendliness,
      comments,
      age,
      gender,
      nationality,
      length_of_stay,
      meal_preference,
      meal_times,
      suggestions,
      overall_satisfaction,
      city,
      timing,
    } = req.body;

    // Insert feedback data into the database
    const query = `
      INSERT INTO feedback (
        food_quality,
        cleanliness,
        menu_variety,
        staff_friendliness,
        comments,
        age,
        gender,
        nationality,
        length_of_stay,
        meal_preference,
        meal_times,
        suggestions,
        overall_satisfaction,
        city,
        timing
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    `;
    const values = [
      food_quality,
      cleanliness,
      menu_variety,
      staff_friendliness,
      comments,
      age,
      gender,
      nationality,
      length_of_stay,
      meal_preference,
      meal_times,
      suggestions,
      overall_satisfaction,
      city,
      timing,
    ];
    await db.query(query, values);

    res.status(200).json({ success: true, message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit feedback.' });
  }
};

export default submitFeedback;
