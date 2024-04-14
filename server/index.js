import express from 'express';
import axios from 'axios';

const app = express();

app.get('/',( req, res)=>{
   res.send("Server is ok");
})


app.listen(8000,()=>{
    console.log('Server is running at Port', 8000);      
})