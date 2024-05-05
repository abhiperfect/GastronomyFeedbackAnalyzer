import connectToDatabase from "../db/postgresClient.js";


function transformData(data) {
  const result = Object.keys(data).map((key) => ({
    label: key,
    data: Object.values(data[key]),
  }));
  return result;
}

const attributesCountsOfQuantData = async (req, res) => {
  try {

    const hotelID = req.query.hotelID;

    // Connect to the PostgreSQL database
    const db = await connectToDatabase();
  
    // SQL query to join tables and retrieve relevant data
    const query = `
    SELECT ff.food_quality, ff.cleanliness, ff.menu_variety, ff.staff_friendliness, ff.overall_satisfaction
    FROM feedback ff
    JOIN restaurant_customer_feedback rcf ON ff.id = rcf.id
    WHERE rcf.restaurant_id = $1`;
  
    // Execute the query with the hotelID parameter
    const result = await db.query(query, [hotelID]);
    const data = result.rows;
  
    const attributeCounts = {
      food_quality: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      cleanliness: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      menu_variety: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      staff_friendliness: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      overall_satisfaction: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };

    // Iterate through each feedback and count the occurrences of each rating for each attribute
    data.forEach((feedback) => {
      Object.keys(feedback).forEach((attribute) => {
        const rating = feedback[attribute];
        if (rating >= 1 && rating <= 5) {
          attributeCounts[attribute][rating]++;
        }
      });
    });
    const transformedData = transformData(attributeCounts);
    console.log("ROUTE 1: FETCHED DATA SUCCESSFULLY");
    res.send({ data: transformedData });
  } catch (error) {
    console.log("Error in getting attributes count data:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default attributesCountsOfQuantData;
