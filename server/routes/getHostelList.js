import express from "express";
import connectToDatabase from "../db/postgresClient.js";
const app = express();

const getHostelList = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const query = "SELECT * FROM restaurant";

    // Execute the query
    const result = await db.query(query);

    console.log("FETCHED HOSTEL LIST FROM DB");
    res.status(200).json({data: result.rows});
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch restaurant data." });
  }
};

export default getHostelList;
