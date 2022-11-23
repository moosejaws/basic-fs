const express = require('express');
const movieRouter = express.Router();
const {v4: uuidv4} = require('uuid')


//fake data

const movies = [
    { title: "die hard", genre: "action", _id: uuidv4()},
    { title: "star wars", genre: "fantasy", _id: uuidv4()}
]

//routes
//argument 1 is endpoint, mountpath; argument 2 is callback function

//Get all
movieRouter.get('/', (req, res) => {
    res.send(movies);
})

//Get just one
movieRouter.get('/:movieId', (req, res) => {
    const movieId = req.params.movieId
    const foundMovie = movies.find(movie => movie._id === movieId)
    res.send(foundMovie)
})

    //Query ?
//Get by genre
movieRouter.get('/search/genre', (req, res) => {
    const genre = req.query.genre
    const filteredMovies = movies.filter(movie => movie.genre === genre)
    res.send(filteredMovies)
})

//Add a movie, go ahead its simple
movieRouter.post('/', (req, res) => {
    const newMovie = req.body
    newMovie._id = uuidv4()
    movies.push(newMovie)
    res.send(`Successfully added ${newMovie.title} to the database`)
})

//Delete movie
movieRouter.delete('/:movieId', (req, res) => {
    const movieId = req.params.movieId
    const movieIndex = movies.findIndex(movie => movie._id === movieId)
    movies.splice(movieIndex, 1)
    res.send("Successfully deleted movie!")
})

//Update movie
movieRouter.put('/:movieId', (req, res) => {
    const movieId = req.params.movieId
    const updateObject = req.body
    const movieIndex = movies.findIndex(movie => movie._id === movieId)
    const updatedMovie = Object.assign(movies[movieIndex], updateObject)
    res.send(updatedMovie)
})

module.exports = movieRouter