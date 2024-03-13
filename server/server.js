// Import required modules
const express = require('express');
const mongoose = require('mongoose');
require ('dotenv').config;

// Create an instance of the express server
const app = express();
const PORT = 5000;

const MONGO_URI =process.env.MONGO_URI;

// Connect to MongoDB 
async function connectToDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connection to edusynx database successful');
    } catch(error) {
        console.log('Unable to connect to database:', error.message);
    }
}
// Run the connectToDatabase function
connectToDatabase();


app.listen(PORT, ()=>{
    console.log(`server is currently running at ${PORT}`)
});

