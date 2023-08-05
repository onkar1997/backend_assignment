const Movie = require('../models/movie.schema')
const BigPromise = require('../utils/promise')
const cloudinary = require('cloudinary')

const createMovie = BigPromise(async (req, res, next) => {
    
    if(!req.files) {
        return next(new Error("Image is required"));
    }

    const {movie_name, summary} = req.body

    if(!movie_name) {
        return next(new Error("Movie Name is required"));
    }

    let file = req.files.image;

    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: 'movies',
        width: 250,
        crop: 'scale'
    });

    const movie = await Movie.create({
        movie_name,
        image: {
            id: result.public_id,
            secure_url: result.secure_url
        },
        summary
    });

    res.status(200).json({
        success: true,
        message: "Movie created successfully",
        movie
    });
    
});

const getMovie = BigPromise(async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findById(id)

    res.status(200).json({
        success: true,
        movie
    })    
})

const getAllMovies = BigPromise(async (req, res) => {
    const movies = await Movie.find();

    res.status(200).json({
        success: true,
        movies,
    });
})

const updateMovie = BigPromise(async (req, res) => {
    const id = req.params.id;
    const {movie_name, summary} = req.body
    
    let file = req.files.image;
    
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: 'movies',
        width: 250,
        crop: 'scale'
    });
    
    const movie = await Movie.findByIdAndUpdate(id, {
        movie_name,
        image: {
            id: result.public_id,
            secure_url: result.secure_url
        },
        summary
    });

    res.status(200).json({
        success: true,
        message: "Movie updated successfully",
        movie
    });
})

const deleteMovie = BigPromise(async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Movie deleted successfully"
    });
});

module.exports = {createMovie, getMovie, getAllMovies, updateMovie, deleteMovie}