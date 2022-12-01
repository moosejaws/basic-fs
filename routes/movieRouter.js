const express = require('express');
const movieRouter = express.Router();
const {v4: uuidv4} = require('uuid')
const Movie = require('../models/movie.js')


//fake data

//routes
//argument 1 is endpoint, mountpath; argument 2 is callback function

//Get all
movieRouter.get('/', (req, res, next) => {
    Movie.find((err, movies) => {
        if(err){
            res.status.apply(500)
            return next(err)
        }
        return res.status(200).send(movies)
    })
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
movieRouter.post('/', (req, res, next) => {
    const newMovie = new Movie(req.body)
    newMovie.save((err, savedMovie) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedMovie)
    })
})

//Delete movie
movieRouter.delete('/:movieId', (req, res, next) => {
    Movie.findOneAndDelete({ _id: req.params.movieId }, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.title} from database`)
})
})

//Update movie
movieRouter.put('/:movieId', (req, res, next) => {
   Movie.findOneAndUpdate(
    { _id: req.params.movieId },
    req.body,
    { new: true },
    (err, updatedMovie) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedMovie)
    }
   )
})

module.exports = movieRouter