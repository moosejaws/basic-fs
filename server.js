const express = require('express');
const app = express();
const {v4: uuidv4} = require('uuid')
const morgan = require('morgan')
const mongoose = require('mongoose')




//middleware
app.use(express.json()); //looks for request body and turns it into req.body
app.use(morgan('dev')) //logs requests to the console, helps with Network Errors

//

//routes
app.use('/movies', require('./routes/movieRouter'))

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

//mongo database
mongoose.connect("mongodb://localhost:27017/moviedb", () => console.log('connected to database'))
//1port 2cb function
app.listen(9000, () => {
    console.log("The server is running on port 9000")
})

