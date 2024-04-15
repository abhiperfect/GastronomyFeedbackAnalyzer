import connectToDatabase from '../db/postgresClient.js'

const getComments = async () => {
  try {
    const db = connectToDatabase();
    // Connect to the database

    // SQL query to select comments from the feedback table
    const query = 'SELECT comments FROM feedback';

    // Execute the query
    const result = await db.query(query);

    // Extract comments from the result
    const comments = result.rows.map(row => row.comments);

    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error; // Throw the error to handle it further up the call stack
  }
};

export default getComments;