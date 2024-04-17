import express from "express";
import axios from "axios";
import generateOTP from "./utils/otpGenerator.js";
import { generateOTPAndSend } from "./controllers/generateOTPAndSend.js";
import bodyParser from "body-parser";
import verifyOTP from "./controllers/verifyOTP.js";
import submitFeedback from "./controllers/submitFeedback.js";
import statisticsRoute from "./middleware/feedbackStatistics.js";
import sentimentRoute from "./middleware/feedbackSentiment.js";
import attributesCountsOfQuantData from "./services/attributesCountsOfQuantData.js";
import calculateTotalRating from "./services/calculateTotalRating.js";
import generateUniqueId from "generate-unique-id";
import { insertUserIntoTempDatabase } from "./controllers/insertUserIntoTempDatabase.js";
import nodemailer from 'nodemailer';
import cors from "cors";
import sendOtpEmail from "./services/sendOtpEmail.js";
import bcrypt from 'bcrypt';
import getOTPByEmail from "./controllers/getOTPByEmail.js";
import userLogin from "./controllers/userLogin.js";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use("/api", statisticsRoute);
app.use("/api", sentimentRoute);

app.get("/", (req, res) => {
  res.send("Server is ok");
});

app.get("/totalrating", calculateTotalRating);
app.get("/getattributescount", attributesCountsOfQuantData);
app.post("/signup", generateOTPAndSend);
app.post("/verify-otp", verifyOTP);
app.post("/submit-feedback", submitFeedback);
app.post('/login',userLogin);




app.listen(8000, () => {
  console.log("Server is running at Port", 8000);
});
