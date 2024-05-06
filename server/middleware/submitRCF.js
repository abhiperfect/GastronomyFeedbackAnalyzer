import connectToDatabase from '../db/postgresClient.js';

async function submitRCF(req, res) {
  try {
    const db = connectToDatabase();

    // Extract parameters from the request body
    const { hotelId, userId, feedbackId, foodFeedbackId } = req.body;

    // Check if any of the required parameters are null or undefined
    if (!hotelId || !userId || !feedbackId || !foodFeedbackId) {
      return res.status(400).json({ success: false, message: 'Missing required parameters.' });
    }

    // Insert the feedback submission into the database
    const query = `
      INSERT INTO restaurant_customer_feedback (restaurant_id, customer_id, feedback_id, food_feedback_id)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [hotelId, userId, feedbackId, foodFeedbackId];
    await db.query(query, values);
    
    // Send a success response
    res.status(201).json({ success: true, message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    // Send an error response
    res.status(500).json({ success: false, message: 'Failed to submit feedback.' });
  }
}

export default submitRCF;
