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
        type: Date
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
    watchList: {
        type: Array,
        default: undefined
    },
    purchased: {
        type: Boolean,
        default: false
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

module.exports = Stock = mongoose.model("stocks", StockSchema)