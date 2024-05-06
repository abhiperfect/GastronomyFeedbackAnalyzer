import express from 'express';
import multer from 'multer';
const router = express.Router();
import connectToDatabase from "../db/postgresClient.js";

// Set up Multer for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Specify the directory where uploaded files will be stored

// Define your route handler
router.post('/addhotel', upload.single('image'), async (req, res) => {
  const { name, address, city, state, country, phoneNumber, website, managerId } = req.body;
    const image = req.file; // Multer will add a file object to the request
   const db = connectToDatabase();

    try {
      const query = `
        INSERT INTO restaurant (name, address, city, state, country, phone_number, website, manager_id, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      await db.query(query, [name, address, city, state, country, phoneNumber, website, managerId, image]);
      console.log("ADD HOTEL: A NEW HOTEL ADDED SUCCESSFULLY: ", name);
      res.status(200).json({ success: true, message: 'Hotel added successfully' });
    
  } catch (error) {
    console.log("ADD HOTEL: UNABLE TO ADD NEW HOTEL : "+ name+ " ENCOUNTERED THE ERROR", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


export default router;