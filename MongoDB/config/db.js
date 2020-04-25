//MongoDB Connection
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//Will return a promise. Use async/await to handle this.
//mongoose.connect(db);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      //useCreateIndex = true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure.
    process.exit(1);
  }
};

module.exports = connectDB;
