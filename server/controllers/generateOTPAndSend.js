import generateOTP from "../utils/otpGenerator.js";
import { insertUserIntoTempDatabase } from "./insertUserIntoTempDatabase.js";
import generateUniqueId from "generate-unique-id";
import sendOtpEmail from "../services/sendOtpEmail.js";
import express from 'express';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

const app = express();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME, // Gmail address
    pass: process.env.EMAIL_PASSWORD, // Gmail password
  },
});

const mailOptions = {
  from: '"Abhishek" abhishekprajapati.890e@gmail.com',
  to: 'johnsondwayne1972dj@gmail.com',
  subject: 'Hello ✔',
  text: 'Hello world?',
  html: '<b>Hello world?</b>',
};





// Define the async function
export async function generateOTPAndSend(req, res) {
  try {
    // Extract user information from the request body
    const { firstName, lastName, email, phonenumber, password } = req.body;

    // Generate a unique ID for the user
    const userId = generateUniqueId();

    // Generate a 6-digit OTP
    const otp = generateOTP();
    const emailSent = await sendOtpEmail(email, otp);
    const info = await transporter.sendMail(mailOptions);
    // console.log(`Message sent: ${info.messageId}`);
    const dataInsertingSuccefully = insertUserIntoTempDatabase(
      userId,
      firstName,
      lastName,
      email,
      phonenumber,
      password,
      otp
    );
    console.log(otp);
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
