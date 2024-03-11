const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_PRIVATE_URL || 'mongodb://127.0.0.1:27017/googlebooks');

module.exports = mongoose.connection;
