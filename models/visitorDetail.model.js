const mongoose = require('mongoose')

const visitorDetailSchema = mongoose.Schema({

  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: String,
  age: Number,
  emailAddress: String,
  phoneNumber: String,
  address: String,
  city: String,
  state: String,
  height: Number,
  weight: Number
});

const visitorDetailModel = mongoose.model('visitorDetail', visitorDetailSchema)

module.exports = visitorDetailModel