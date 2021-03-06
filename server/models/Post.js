const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const likeSchema = require('./Like');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
    {
        postText: {
            type: String,
            required: 'Your post must have content.',
            minlength: 1,
            maxlength: 280
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
        userImage: {
            type: String,
        },
        comments: [commentSchema],
        likes: [likeSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

postSchema.virtual('likeCount').get(function() {
    return this.likes.length;
})

const Post = model('Post', postSchema);

module.exports = Post;