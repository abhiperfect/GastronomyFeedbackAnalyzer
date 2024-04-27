import connectToDatabase from '../db/postgresClient.js';
import bcrypt from 'bcrypt';


async function insertUserIntoTempDatabase(userId, firstName, lastName, email, phoneNumber, password, otp) {
  try {

    const db = connectToDatabase();
    const passwordHash = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const query = 'INSERT INTO userstemp (user_id, first_name, last_name, email, phone_number,password_hash, otp) VALUES ($1, $2, $3, $4, $5,$6,$7)';
    const values = [userId, firstName, lastName, email, phoneNumber, passwordHash, otp];
    await db.query(query, values);
    
    console.log('User inserted into the Temp database successfully.');
    return true; // Return true if insertion is successful
  } catch (error) {
    console.error('Error inserting user into Temp database:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export { insertUserIntoTempDatabase };
