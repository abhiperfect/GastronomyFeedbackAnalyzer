import connectToDatabase from '../db/postgresClient.js';

async function createUser(firstName, lastName, email, phoneNumber, passwordHash) {
  try {
    const db = connectToDatabase();
    // Insert user data into the database
    const insertQuery = `
      INSERT INTO users (first_name, last_name, email, phone_number, password_hash, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id, first_name, last_name, email, phone_number, role
    `;
    const insertValues = [firstName, lastName, email, phoneNumber, passwordHash, 'user'];
    const { rows } = await db.query(insertQuery, insertValues);

    const userData = rows[0]; // Get the user data from the inserted row

    console.log('User created successfully');
    return userData; // Return the user data
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export default createUser;
