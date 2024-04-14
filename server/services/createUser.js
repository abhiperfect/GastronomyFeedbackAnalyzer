import connectToDatabase from '../db/postgresClient.js'

async function createUser( firstName, lastName, email, phoneNumber, passwordHash) {
  try {
 
    const db = connectToDatabase();
    // Insert user data into the database
    const query = `
      INSERT INTO users (first_name, last_name, email, phone_number, password_hash)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [firstName, lastName, email, phoneNumber, passwordHash];
    await db.query(query, values);

    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

export default createUser;