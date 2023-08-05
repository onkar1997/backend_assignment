require('dotenv').config();

const express = require("express")
const cors = require("cors")
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const app = express()

// regular middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// cors, cookies and fileupload
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

// morgan middleware
app.use(morgan('tiny'))

// importing routes
const movieRoutes = require('./routes/movie.router')


app.use("/api", movieRoutes)

// exporting app
module.exports = app