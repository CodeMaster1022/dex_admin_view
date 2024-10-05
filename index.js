const express = require('express');  
const { MongoClient } = require('mongodb');
const cors = require('cors');  // Import the cors middleware
const app = express();  

const router = require("./router");

const port = 3000; // You can use any port not in use  
const uri = "mongodb+srv://vanguard951105:F0Y7B0MtjvH1OFbL@cluster0.haemz.mongodb.net/Dexscreener"; // Your MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON bodies  
app.use(cors());
app.use(express.json());  
app.use("/", router);


// Start the server  
app.listen(port, () => {  
  console.log(`Server is running at http://localhost:${port}`);  
});  