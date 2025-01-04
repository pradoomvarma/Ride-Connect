const Details = require("../models/details")
const User = require("../models/user")
const mongoose = require("mongoose")

const InsertData = async (req, res) => {
    try {

        console.log("Enter")
        const data = req.body;

        const card = await Details.create({
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
            expiresAfter: data.expire,
            userId: data.id
        })

        console.log(data)

        const update_user_card = await User.findByIdAndUpdate(new mongoose.Types.ObjectId(data.id), {
            $push: {
                card: card._id
            }
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

module.exports = InsertData;