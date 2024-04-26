import connectToDatabase from '../db/postgresClient.js';

const submitFeedback = async (req, res) => {
  const db = connectToDatabase();
  try {
    // Extract feedback data from the request body
    const {
      cleanliness,
      menuVariety,
      staffFriendliness,
      comments,
      age,
      gender,
      nationality,
      city,
      mealPreference,
      mealTimes,
      suggestions,
      lengthOfStay,
      overallSatisfaction
    } = req.body;

    // Retrieve overall food quality from temp_food_quality table
    const foodQualityData = await db.query('SELECT overall_food_quality FROM temp_food_quality');
    const foodQuality = foodQualityData.rows.length > 0 ? foodQualityData.rows[0].overall_food_quality : 0;

    // If temp_food_quality table is not null, delete its contents
    if (foodQuality !== 0) {
      await db.query('DELETE FROM temp_food_quality');
    }

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
        city,
        meal_preference,
        meal_times,
        suggestions,
        length_of_stay,
        overall_satisfaction
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;

    const values = [
      foodQuality,
      cleanliness,
      menuVariety,
      staffFriendliness,
      comments,
      age,
      gender,
      nationality,
      city,
      mealPreference,
      mealTimes,
      suggestions,
      lengthOfStay,
      overallSatisfaction
    ];

    await db.query(query, values);

    res.status(200).json({ success: true, message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit feedback.' });
  }
};

export default submitFeedback;
