const express = require("express")
const Insert = require("../Controller/data_insert")
const UpdateData = require("../Controller/update_data")
const DeleteData = require("../Controller/delete_data")
const LoggedIn = require("../middlewares/LoggedIn")
const router = express.Router()

router.post('/insert_data', LoggedIn, Insert);
router.post('/update_data', LoggedIn, UpdateData);
router.post('/delete', LoggedIn, DeleteData);

module.exports = router;