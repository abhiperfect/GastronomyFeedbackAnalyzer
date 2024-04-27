import connectToDatabase from '../db/postgresClient.js';

export default async function getUserByEmail(email) {
  try {
    const db = connectToDatabase();
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const { rows } = await db.query(query, values);

    if (rows.length === 0) {
      // If no user is found with the specified email, return null
      return null;
    }

    return rows[0]; // Return the first row (if any) matching the email
  } catch (error) {
    // Handle errors
    console.error('Error fetching user by email:', error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
}
