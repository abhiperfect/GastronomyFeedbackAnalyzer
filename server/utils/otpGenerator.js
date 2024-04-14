import otpGenerator from 'otp-generator';

// Function to generate a 6-digit numeric OTP 
export default function generateOTP() {
  return otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
}
