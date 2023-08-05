const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    movie_name: {
        type: String,
        required: [true, "Please provide a movie name"],
        trim: true,
        maxLength: [50, "Movie name should not be more than 50 characters"]
    }, 
    image: {
        id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    summary: {
        type: String,
    }
}, {timestamps: true});


module.exports =  mongoose.model("Movie", movieSchema)
