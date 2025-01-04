const Details = require("../models/details")

const getData = async (req, res) => {
    try {
        const data = await Details.find(req.query.data).sort({ createdAt: 1 });
        res.status(200).json({
            success: "true",
            data: data,
            token: req.user_token,
            user_name: req.user_name,
            id: req.id
        })
    }
    catch (err) {
        console.log("Failed in Getting Data\n", err);
        res.status(400).json({
            success: false,
            message: "Failed to Get Data"
        })
    }
}

module.exports = getData;