const Details = require("../models/details")
const mongoose = require("mongoose")

const UpdateData = async (req, res) => {
    try {

        console.log("Update")
        const data = req.body;
        console.log(data.cardId)

        const card = await Details.findByIdAndUpdate(new mongoose.Types.ObjectId(data.cardId), {
            user_name: data.user_name,
            phone_no: data.phone_no,
            source: data.source,
            destination: data.destination,
            start_time: data.start_time,
            end_time: data.end_time,
            date: data.date,
            gender: data.gender,
            email: data.email,
            comment: data.comment,
            expire: data.expire,
            userId: data.id
        })


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

module.exports = UpdateData;