let mongoose = require('mongoose');


//Database added
process.env.MONGO_URI='mongodb+srv://rahulg510:admin@cluster0-ulnzk.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;


module.exports = mongoose;