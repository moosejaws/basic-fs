const express = require('express');
const app = express();
const {v4: uuidv4} = require('uuid')
const morgan = require('morgan')




//middleware
app.use(express.json()); //looks for request body and turns it into req.body
app.use(morgan('dev')) //logs requests to the console, helps with Network Errors

//routes
app.use('/movies', require('./routes/movieRouter'))


//1port 2cb function
app.listen(9000, () => {
    console.log("The server is running on port 9000")
})

