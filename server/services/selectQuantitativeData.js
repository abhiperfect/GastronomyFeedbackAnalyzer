import connectToDatabase from "../db/postgresClient.js";

export default async function selectQuantitativeData() {
  const db = connectToDatabase();
  try {

    const query = `
      SELECT food_quality, cleanliness, menu_variety, staff_friendliness, overall_satisfaction
      FROM feedback;
    `;
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error selecting quantitative data:", error);
    throw error;
  }
}
