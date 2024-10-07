const express = require("express")
const router = express.Router()
const Data = require("../models/data")

router.post("/data", async (req,res)=>{
    try{
        const {distance, status} = req.body
        
        const data = await new Data({
            distance: distance,
            status: status
        })

        await data.save()
        res.status(200).message("Data entry successful")
    }catch(err){
        res.status(500).json(`Server error : ${err}`)
        console.log("Some error occurred : ",err)
    }
})

module.exports = router