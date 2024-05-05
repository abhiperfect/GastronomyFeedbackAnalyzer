import bcrypt from 'bcrypt';
import getOTPByEmail from "./getOTPByEmail.js";
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
      const hashedPassword = result.rows[0].password_hash;
      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      const token = jwt.sign({ userId: result.rows[0].user_id }, 'your_jwt_secret', { expiresIn: '1h' }); 
      // OTP is verified successfully, send success response
      if (passwordMatch) {
        console.log("USER LOGIN: USER LOGGEDIN SUCCESSFULLY.");
        res.status(200).json({ success: true, message: "Login successful",userData: result.rows , token:token});
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
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default userLogin;
