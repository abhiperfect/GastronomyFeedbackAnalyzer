import { getUserByIdFromTempDB } from "./getUserByIdFromTempDB.js";
import deleteUserFromTempDB from "../services/deleteUserFromTempDB.js";
import createUser from "../services/createUser.js";

export default async function verifyOTP(req, res) {
  try {
    // Extract user ID and OTP from the request body
    const { userId, otp } = req.body;

    // Retrieve user data from temporary storage (replace this with your actual data storage mechanism) 
    const userData = await getUserByIdFromTempDB(userId);
    // Check if user data exists and if the OTP matches
    if (userData && userData.otp === otp) {
      await createUser(userData.first_name, userData.last_name, userData.email, userData.phone_number, userData.password_hash);
      // OTP is verified successfully
      res
        .status(200)
        .json({ success: true, message: "OTP verified successfully." });
    } else {
      // OTP verification failed
      res.status(400).json({ success: false, message: "Invalid OTP." });
    }
    await deleteUserFromTempDB(userId);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP." });
  }
}
