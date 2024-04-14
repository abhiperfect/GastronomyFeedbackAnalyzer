import generateOTP from "../utils/otpGenerator.js";
import { insertUserIntoTempDatabase } from "./insertUserIntoTempDatabase.js";
import generateUniqueId from 'generate-unique-id';
// Import your utility functions

// Define the async function
export async function generateOTPAndSend(req, res) {
  try {
    // Extract user information from the request body
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    // Generate a unique ID for the user
    const userId = generateUniqueId();

    // Generate a 6-digit OTP
    const otp = generateOTP();
    insertUserIntoTempDatabase(userId, firstName, lastName, email, phoneNumber, password,otp);
    
    // Send the OTP to the user (implementation omitted for brevity)

    // Return success response with the generated OTP and user ID
    res.status(200).json({ success: true, message: 'OTP sent successfully.', otp, userId });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate OTP.' });
  }
}
