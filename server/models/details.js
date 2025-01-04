const mongoose = require("mongoose");

const TravelDetailsSchema = new mongoose.Schema({
    user_name: {
        type: String,
        require: true
    },
    phone_no: {
        type: String,
        require: true
    },
    source: {
        type: String,
        require: true
    },
    destination: {
        type: String,
        require: true
    },
    start_time: {
        type: String,
        require: true,
        // match: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
    },
    end_time: {
        type: String,
        require: true,
        // match: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
    },
    date: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAfter: {
        type: Date,
        require: true,
    },
    userId: {
        type: String,
        require: true
    }
});

TravelDetailsSchema.index({ expiresAfter: 1 }, { expireAfterSeconds: 1 });

const TravelDetails = new mongoose.model("TravelDetails", TravelDetailsSchema);

module.exports = TravelDetails