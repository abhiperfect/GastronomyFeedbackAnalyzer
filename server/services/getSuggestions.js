import connectToDatabase from '../db/postgresClient.js'


const getSuggestions = async (restaurant_id) => {
  try {
    // Connect to the database
    const db = connectToDatabase();

    // SQL query to select suggestions from the feedback table
    const query = `
    SELECT ff.suggestions
      FROM feedback ff
      JOIN restaurant_customer_feedback rcf ON ff.id = rcf.id
      WHERE rcf.restaurant_id = $1
    `;

    // Execute the query
    const result = await db.query(query,[restaurant_id]);


    // Extract suggestions from the result
    const suggestions = result.rows.map(row => row.suggestions);

    return suggestions;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error; // Throw the error to handle it further up the call stack
  }
};

export default getSuggestions;