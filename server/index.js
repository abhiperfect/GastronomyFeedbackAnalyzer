import express from 'express';
import axios from 'axios';
import generateOTP from './utils/otpGenerator.js';
import { generateOTPAndSend } from './controllers/generateOTPAndSend.js';
import bodyParser from 'body-parser';
import verifyOTP from './controllers/verifyOTP.js';

const app = express();
const tempUserData = {};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/',( req, res)=>{
   res.send("Server is ok");
})

app.post('/generate-otp', generateOTPAndSend);
app.post('/verify-otp', verifyOTP);

app.listen(8000,()=>{
    console.log('Server is running at Port', 8000);      
})
