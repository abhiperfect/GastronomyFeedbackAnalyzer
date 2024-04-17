import db from "../db/postgresClient.js";
import connectToDatabase from "../db/postgresClient.js";

export async function getUserByIdFromTempDB(userId) {
  const db = connectToDatabase();
  const query = "SELECT * FROM userstemp WHERE user_id = $1";
  console.log("userId", userId);
  const { rows } = await db.query(query, [userId]);
  return rows[0];
}
