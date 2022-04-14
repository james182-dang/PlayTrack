const { Schema } = require('mongoose');

const gameSchema = new Schema({
    gameId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

gameSchema.virtual('reviewCount').get(function () {
    return this.reviews.length;
})

module.exports = gameSchema;