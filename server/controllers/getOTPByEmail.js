import connectToDatabase from "../db/postgresClient.js";
// Method to get OTP from the database by email
export default async function getOTPByEmail(email) {
  try {
    const db = connectToDatabase();
    // Query to select the Password for the given email
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    // Execute the query
    const result = await db.query(query);

    // Check if a row was found
    if (result.rows.length > 0) {
      // Return the OTP
      return result;
    } else {
      // No OTP found for the given email
      return null;
    }
  } catch (error) {
    console.error('Error retrieving OTP from database:', error);
    throw error; // Throw the error to handle it in the calling code
  }
}


