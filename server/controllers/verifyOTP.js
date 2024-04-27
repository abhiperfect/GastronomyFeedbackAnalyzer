import { getUserByIdFromTempDB } from "./getUserByIdFromTempDB.js";
import deleteUserFromTempDB from "../services/deleteUserFromTempDB.js";
import getUserByEmail from '../controllers/getUserByEmail.js';
import createUser from "../services/createUser.js";
import jwt from 'jsonwebtoken';


export default async function verifyOTP(req, res) {
  try {
    // Extract user ID and OTP from the request body
    const { userId, otp } = req.body;

    // Retrieve user data from temporary storage (replace this with your actual data storage mechanism) 
    const userData = await getUserByIdFromTempDB(userId);
    
    // Check if user data exists and if the OTP matches
    if (!userData || userData.otp !== otp) {
      console.log("Inavlid Otp");
      // If user data doesn't exist or OTP doesn't match, send error response
      return res.status(200).json({ success: false, message: "Invalid OTP." });
    }

    // Check if user already exists in the permanent database
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {

      // If user already exists, send error response
      return res.status(200).json({ success: false,exists: true, message: "User already exists." });
    }

    // If user doesn't exist, create a new user
    const user_Data = await createUser(userData.first_name, userData.last_name, userData.email, userData.phone_number, userData.password_hash);
    // Change 'your_jwt_secret' to your actual secret key
    const token = jwt.sign({ userId: user_Data.user_id }, 'your_jwt_secret', { expiresIn: '1h' }); 
    // OTP is verified successfully, send success response
    res.status(200).json({ success: true, message: "OTP verified successfully." , token: token, userData: user_Data});

    // Delete user data from temporary storage
    await deleteUserFromTempDB(userId);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP." });
  }
}
