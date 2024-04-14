import connectToDatabase from '../db/postgresClient.js'

async function deleteUserFromTempDB(userId) {
  try {
    const db = connectToDatabase();
    const query = 'DELETE FROM userstemp WHERE user_id = $1';
    const values = [userId];
    const result = await db.query(query, values);
    console.log('User data deleted successfully From Temp DB');
    return true; // Return true if deletion is successful
  } catch (error) {
    console.error('Error deleting user data From Temp DB:', error);
    return false; // Return false if deletion fails
  }
}

export default deleteUserFromTempDB;
