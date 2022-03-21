const { Schema } = require('mongoose');

const gameSchema = new Schema({
    gameId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    summary: {
        type: String,
    }
});

module.exports = gameSchema;