import nodemailer from 'nodemailer';

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "torey.mante44@ethereal.email",
    pass: "abVzCqgnRQhag2YvwM",
  },
});

export default async function sendOtpEmail(email, otp) {
  // Define email options
  const mailOptions = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // Sender address
    to: email, // Recipient email address
    subject: "OTP Verification", // Email subject
    text: `Your OTP for verification is: ${otp}`, // Email body
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("OTP email sent successfully.");
    return true; // Return true if email is sent successfully
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false; // Return false if there's an error sending the email
  }
}

