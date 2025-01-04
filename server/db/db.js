const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB).then(() => {
            console.log("DB Connect");
        })
    }
    catch (err) {
        console.log("Failed to Connect", err);
    }
}

module.exports = dbConnect;