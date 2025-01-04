const Details = require("../models/details")
const mongoose = require("mongoose")

const DeleteData = async (req, res) => {
    try {

        const data = req.body;

        await Details.deleteOne(new mongoose.Types.ObjectId(data.id))

        return res.status(200).json({
            success: true,
            message: "Inserted Data Successfully"
        })
    }
    catch (err) {
        console.log("Failed in Insertion\n", err);
        res.status(400).json({
            success: false,
            message: "Failed to Insert Data"
        })
    }
}

module.exports = DeleteData;