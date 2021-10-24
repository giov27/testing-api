const mongoose = require('mongoose')

const queueNumberchema = mongoose.Schema({

  queueNum: Number,
  date: String,
  time: String,
  
});

const queueNumberModel = mongoose.model('queueNumber', queueNumberchema)

module.exports = queueNumberModel