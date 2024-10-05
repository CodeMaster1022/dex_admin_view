const  mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    Address: {
        type: String,
    },
    Total_PNL: {
        type: Number,
    },
    Total_Profit: {
        type: Number,
    },
    Win_Rate: {
        type: Number,
    },
    Avg_Buy_Price: {
        type: Number,
    },
    overLap: {
    },
    Token_Traded: {
        type: Number,
    },
    trade_info: [{
        pair_address: String,
        token_address: String,
        bought_usd: Number,
        bought_amount: Number,
        sold_usd: Number,
        sold_amount: Number,
        profit: Number,
    }],
});

const Wallet = mongoose.model("'wallet_data'", walletSchema);

module.exports = Wallet;