import connectToDatabase from '../db/postgresClient.js';
import calculateOverallRating from '../services/calculateOverallRating.js';
const foodFeedbackRoute = async (req, res) => {
  try {

    // Establish a database connection
    const db = connectToDatabase();
    const overallRating = calculateOverallRating(req.body);

    await db.query('INSERT INTO temp_food_quality (overall_food_quality) VALUES ($1)',[overallRating]);
    const { taste, texture, presentation, freshness, aroma, portionSize, valueForMoney, healthiness } = req.body;

    // Insert data into temp_food_quality table
    const query = `
      INSERT INTO food_feedback 
      (taste, texture, presentation, freshness, aroma, portion_size, value_for_money, healthiness) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
      
    const values = [taste, texture, presentation, freshness, aroma,portionSize, valueForMoney, healthiness];

    const result = await db.query(query, values);
    const foodFeedbackId = result.rows[0].id;
  
    res.status(201).json({ foodFeedbackId: foodFeedbackId });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal server error');
  }
};

export default foodFeedbackRoute;
