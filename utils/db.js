const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://vanguard951105:F0Y7B0MtjvH1OFbL@cluster0.haemz.mongodb.net/Dexscreener"; // Your MongoDB URI
const client = new MongoClient(uri);

module.exports = client;