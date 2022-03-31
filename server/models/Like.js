const { Schema } = require('mongoose');
const dateFromat = require('../utils/dateFormat');

const likeSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = likeSchema;