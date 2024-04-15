import express from 'express';
import axios from 'axios';
import generateOTP from './utils/otpGenerator.js';
import { generateOTPAndSend } from './controllers/generateOTPAndSend.js';
import bodyParser from 'body-parser';
import verifyOTP from './controllers/verifyOTP.js';
import submitFeedback from './controllers/submitFeedback.js';
import statisticsRoute from './middleware/feedbackStatistics.js'
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/api', statisticsRoute);


app.get('/',( req, res)=>{
   res.send("Server is ok");
})

app.post('/generate-otp', generateOTPAndSend);
app.post('/verify-otp', verifyOTP);
app.post('/submit-feedback',submitFeedback);

app.get('');


app.listen(8000,()=>{
    console.log('Server is running at Port', 8000);      
})
