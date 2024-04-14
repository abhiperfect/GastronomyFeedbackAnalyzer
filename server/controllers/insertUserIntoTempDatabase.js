import connectToDatabase from '../db/postgresClient.js'

async function insertUserIntoTempDatabase(userId, firstName, lastName, email, phoneNumber, otp) {
  try {
    const db = connectToDatabase();
    const query = 'INSERT INTO userstemp (user_id, first_name, last_name, email, phone_number, otp) VALUES ($1, $2, $3, $4, $5,$6)';
    const values = [userId, firstName, lastName, email, phoneNumber,otp];
    await db.query(query, values);
    
    console.log('User inserted into the database successfully.');
    return true; // Return true if insertion is successful
  } catch (error) {
    console.error('Error inserting user into database:', error);
    return false; // Return false if there's an error
  }
}

export { insertUserIntoTempDatabase };
