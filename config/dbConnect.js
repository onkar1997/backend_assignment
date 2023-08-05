const mongoose = require('mongoose')

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB CONNECTED !");

    mongoose.connection.on('error', (err) => {
        console.error("ERROR: ", err);
        throw err
    })
}


module.exports = connectToDB;