const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reactions");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => date.toLocaleDateString()
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    });

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length
});

const Thoughts = model('thought', thoughtSchema)

module.exports = Thoughts;