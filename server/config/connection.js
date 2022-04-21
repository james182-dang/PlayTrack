const mongoose = require('mongoose');
const cloudinary = require('cloudinary')
const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'});

mongoose.connect(process.env.MOGODB_URI || 'mongodb+srv://James182:7FjUBMhra!ck8%407@cluster0.7lth2.mongodb.net/PlayTrack?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

module.exports = mongoose.connection, cloudinary.config;