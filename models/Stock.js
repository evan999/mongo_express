const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true 
    },
    timeZone: {
        type: Date,
        default: Date.now
    },
    lastPrice: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    YTDReturn: {
        type: Number
    },
    watchList: [{
        type: String,
        default: undefined
    }],
    purchased: {
        type: Boolean,
        default: false
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    topStocks: [{
        type: String,
        default: undefined
    }]
})

module.exports = Stock = mongoose.model("stocks", StockSchema);