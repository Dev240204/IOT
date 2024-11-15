// routes/sensor.js
const express = require("express");
const router = express.Router();
const Data = require("../models/data");

router.get("/data", async (req, res) => {
    try {
        const data = await Data.find().sort({$natural:-1}).limit(1);
        res.status(200).json(data);
    } catch(err) {
        res.status(500).json(`Server error : ${err}`);
        console.log("Some error occurred : ", err);
    }
});

module.exports = router;