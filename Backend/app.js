const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

require("dotenv").config();

const dbUrl = process.env.DB_URL;

// database connected 
mongoose.connect(dbUrl).then(()=>{
    console.log(`Database connected successfully`);
}).catch((err)=>console.log(err))


// api 

const router = require("./src/routes/api");

app.use(`/api/v1`,router)



module.exports = app