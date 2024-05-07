import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDatabase from "../db/postgresClient.js";

const userLogin = async (req, res) => {
  const { email, password } = req.body;
     
  try {
    const db = connectToDatabase();
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    // Execute the query
    const result = await db.query(query);

    // Check if a row was found
    if (result.rows.length > 0) {
      const { password_hash, ...userData } = result.rows[0];
      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(password, password_hash);
    
      if (passwordMatch) {
        const token = jwt.sign({ userData: result.rows, userId: userData.user_id }, 'your_jwt_secret', { expiresIn: '1h' }); 
        console.log("USER LOGIN: USER LOGGED IN SUCCESSFULLY.");
        res.status(200).json({ success: true, message: "Login successful", userData, token });
      } else {
        console.log("USER LOGIN: USER PASSWORD INCORRECT.");
        res.status(200).json({ success: false, message: "Incorrect password" });
      }
    } else {
      console.log("USER LOGIN: USER NOT FOUND.");
      res.status(200).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log("USER LOGIN: INTERNAL SERVER ERROR.");
    console.error("ERROR LOGGING IN:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default userLogin;
