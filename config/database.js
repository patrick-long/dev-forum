const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:1234@cluster0.u8q4e.mongodb.net/dev-forums?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection; 

db.on('connected', () => {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
});