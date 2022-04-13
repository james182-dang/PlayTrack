const { Schema } = require('mongoose');

const gameSchema = new Schema({
    gameId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
    }
});

module.exports = gameSchema;