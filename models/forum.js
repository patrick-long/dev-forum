const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema ({
    content: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    }
},  {
    timestamps: true
})

const forumSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String, 
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    responses: [responseSchema],
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    }
},  { 
    timestamps: true
});

module.exports = mongoose.model('Forum', forumSchema);