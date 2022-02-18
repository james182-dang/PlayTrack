const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.connect(process.env.MOGODB_URI || 'mongodb+srv://James182:7FjUBMhra!ck8%407@cluster0.7lth2.mongodb.net/PlayTrack?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports = mongoose.connection;