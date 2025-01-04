const express = require("express")
const getData = require("../Controller/get_data")
const LoggedIn = require("../middlewares/LoggedIn")
const router = express.Router()

router.get('/get_data', LoggedIn, getData);
router.get('/check', LoggedIn, (req, res) => {
    return res.send({
        success: true,
        token: req.user_token,
        user_name: req.user_name,
        id: req.id
    })
})


module.exports = router;