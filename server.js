const app = require('./app');
const connectToDB = require('./config/dbConnect');
const cloudinary = require('cloudinary');

(async () => {
    try {
        connectToDB();

        // cloudinary config
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })

        app.listen(process.env.PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
        })

    } catch (err) {
        console.error("ERROR: ", err);
    }
})();