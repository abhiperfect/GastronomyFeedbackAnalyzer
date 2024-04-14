import { getUserByIdFromTempDB } from "./getUserByIdFromTempDB.js";


export default async function verifyOTP(req, res) {
  try {
    // Extract user ID and OTP from the request body
    const { userId, otp } = req.body;

    // Retrieve user data from temporary storage (replace this with your actual data storage mechanism)
    const userData =  await getUserByIdFromTempDB(userId);
    console.log("ss",userData);
    // Check if user data exists and if the OTP matches

    if (userData && userData.otp === otp) {
      // OTP is verified successfully
      res.status(200).json({ success: true, message: 'OTP verified successfully.' });
    } else {
      // OTP verification failed
      res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP.' });
  }
}
