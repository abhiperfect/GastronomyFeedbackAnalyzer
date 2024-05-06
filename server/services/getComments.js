import connectToDatabase from '../db/postgresClient.js'

const getComments = async (restaurant_id) => {
  try {
    const db = connectToDatabase();
    // Connect to the database

    // SQL query to select comments from the feedback table
    const query = `
    SELECT ff.comments
      FROM feedback ff
      JOIN restaurant_customer_feedback rcf ON ff.id = rcf.feedback_id
      WHERE rcf.restaurant_id = $1
    `;

    // Execute the query
    const result = await db.query(query,[restaurant_id]);

    // Extract comments from the result
    const comments = result.rows.map(row => row.comments);

    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error; // Throw the error to handle it further up the call stack
  }
};

export default getComments;