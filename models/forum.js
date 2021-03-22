const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    // reviews: [reviewSchema]
}, { timestamps: true
});

module.exports = mongoose.model('Forum', forumSchema);