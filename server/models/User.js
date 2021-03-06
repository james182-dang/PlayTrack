const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

const gameSchema = require('./Game');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        image: {
            type: String
        },
        bio: {
            type: String,
            maxLength: 500
        },
        nowPlaying: {
            type: Schema.Types.ObjectId,
            ref: 'Game'
        },
        savedGames: [gameSchema],
        completedGames: [gameSchema],
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('completedGameCount').get(function () {
    return this.completedGames.length;
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

userSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

userSchema.virtual('reviewCount').get(function () {
    return this.reviews.length;
});

const User = model('User', userSchema);

module.exports = User;