if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require('express');
const PORT = process.env.PORT;
const cors = require("cors")
const sensorRouter = require("../routes/sensor")
const connect = require("./connect")

const app = express();

app.use(cors)
app.use(express.json());
app.use(express.urlencoded({extended : true}))

connect()
.then(() => {
    console.log("Ready to Save data!")
})
.catch((err) => {
    console.log("Some error occurred",err)
})

app.use("/sensor",sensorRouter)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app