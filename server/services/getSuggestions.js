import connectToDatabase from '../db/postgresClient.js'


const getSuggestions = async () => {
  try {
    // Connect to the database
    const db = connectToDatabase();

    // SQL query to select suggestions from the feedback table
    const query = 'SELECT suggestions FROM feedback';

    // Execute the query
    const result = await db.query(query);


    // Extract suggestions from the result
    const suggestions = result.rows.map(row => row.suggestions);

    return suggestions;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error; // Throw the error to handle it further up the call stack
  }
};

export default getSuggestions;