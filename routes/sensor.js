const express = require("express")
const router = express.Router()

router.post("/data",(req,res)=>{
    try{
        const data = req.body
        console.log(data)   
        res.status(200).send(data)
    }catch(err){
        res.status(500).json(`Server error : ${err}`)
        console.log("Some error occurred : ",err)
    }
})

module.exports = router