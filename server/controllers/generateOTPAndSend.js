import generateOTP from "../utils/otpGenerator.js";
import { insertUserIntoTempDatabase } from "./insertUserIntoTempDatabase.js";
import generateUniqueId from "generate-unique-id";
import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME, // Gmail address
    pass: process.env.EMAIL_PASSWORD, // Gmail password
  },
});

// Define the async function
export async function generateOTPAndSend(req, res) {
  try {
    // Extract user information from the request body
    const { firstName, lastName, email, phonenumber, password } = req.body;

    // Generate a unique ID for the user
    const userId = generateUniqueId();
    // Generate a 6-digit OTP
    const otp = generateOTP();

    // Create the mail options
    const mailOptions = {
      from: `"Your Name" ${process.env.EMAIL_USERNAME}`,
      to: email,
      subject: "OTP Verification",
      text: `Hello ${firstName} ${lastName}, your OTP for registration is ${otp}. Please use this OTP to complete your registration.`,
      html: `<p>Hello ${firstName} ${lastName},</p><p>Your OTP for registration is <strong>${otp}</strong>.</p><p>Please use this OTP to complete your registration.</p>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);

    // Insert user into temporary database
    const dataInsertingSuccessfully = insertUserIntoTempDatabase(
      userId,
      firstName,
      lastName,
      email,
      phonenumber,
      password,
      otp
    );

    // Respond with success message and OTP
    if (dataInsertingSuccessfully) {
      res.status(200).json({
        otpRequired: true,
        success: true,
        message: "OTP sent successfully.",
        userId,
      });
    } else {
      res.status(200).json({
        otpRequired: false,
        success: false,
        message: "User already exists.",
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
