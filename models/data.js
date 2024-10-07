const mongoose = require("mongoose")

const dataSchema = mongoose.Schema({
    distance:{
        type: Number,
        required: true
    },
    status : {
        type: String,
        required: true
    }
});

const Data = mongoose.model("Data",dataSchema);

module.exports = Data