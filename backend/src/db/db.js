const mongoose = require('mongoose');

const connectDB = async() => {

  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB database connected');
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
    });
}

module.exports = connectDB 