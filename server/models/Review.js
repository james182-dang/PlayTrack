const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema(
    {
        reviewText: {
            type: String,
            required: 'Write your review!',
            minlength: 1,
            maxlength: 5000
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        comments: [commentSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

reviewSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Review = model('Review', reviewSchema);

module.exports = Review;