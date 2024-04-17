import generateOTP from "../utils/otpGenerator.js";
import { insertUserIntoTempDatabase } from "./insertUserIntoTempDatabase.js";
import generateUniqueId from "generate-unique-id";
import sendOtpEmail from "../services/sendOtpEmail.js";
// Import your utility functions

// Define the async function
export async function generateOTPAndSend(req, res) {
  try {
    // Extract user information from the request body
    const { firstName, lastName, email, phonenumber, password } = req.body;

    // Generate a unique ID for the user
    const userId = generateUniqueId();

    // Generate a 6-digit OTP
    const otp = generateOTP();
    // const emailSent = await sendOtpEmail(email, otp);
    const dataInsertingSuccefully = insertUserIntoTempDatabase(
      userId,
      firstName,
      lastName,
      email,
      phonenumber,
      password,
      otp
    );

    // Send the OTP to the user (implementation omitted for brevity)

    if (dataInsertingSuccefully) {
      res.status(200).json({
        otpRequired: true,
        success: true,
        message: "OTP sent successfully.",
        otp,
        userId,
      });
    } else {
      res.status(200).json({
        otpRequired: false,
        success: false,
        message: "User Already exist",
        otp,
        userId,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate OTP." });
  }
}
