const express = require("express")
const router = express.Router()

router.post("/data",(req,res)=>{
    try{
        const data = req.body
        res.status(201).json("Sensor Data : ",data)
    }catch(err){
        res.status(500).json("Server error",err)
        console.log("Some error occurred : ",err)
    }
})

module.exports = router