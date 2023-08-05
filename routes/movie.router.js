const express = require('express')
const {createMovie, getMovie, getAllMovies, updateMovie, deleteMovie} = require('../controllers/movie.controller.js')

const router = express.Router()

router.get('/movies', getAllMovies)
router.get('/movie/:id', getMovie)
router.post('/createMovie', createMovie)
router.put('/editMovie/:id', updateMovie)
router.delete('/deleteMovie/:id', deleteMovie)

module.exports = router;