const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: String,
    password: String,
    forumPosts: [{
        type: Schema.Types.ObjectId,
        ref: "Forum"
    }],
});

module.exports = mongoose.model('User', userSchema);