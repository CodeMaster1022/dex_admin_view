const Wallet = require("../model/Wallet");
const client = require("../utils/db");

exports.fetchData = async (req, res) => {
    await client.connect();

    console.log('Connected to MongoDB Atlas');

    // Specify the database and collection you want to access
    const database = client.db('Dexscreener');
    const collection = database.collection('wallet_data');

    // Query the collection
    const query = {}; // Modify this query to filter data if needed
    const data = await collection.find(query).toArray();

    res.json(data);
};