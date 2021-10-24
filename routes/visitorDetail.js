var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

const visitorDetail = require('../models/visitorDetail.model')

// Get all data
router.get('/', function(req, res, next) {
  visitorDetail.find((err,visitorDetailList)=>{
    if(err){
      res.send({status: 500, message: 'Get Visitor List Failed'})
    }else{
      const recordCount = visitorDetailList.length
      res.send({status: 200, recordCount: recordCount, results: visitorDetailList})
    }
  })
});

// Get specific data
router.get('/detail', function(req, res, next) {

  const userId = req.query.userId
  visitorDetail.findById(userId, (err,visitorResponse)=>{
    if(err){
      res.send({status: 500, message: 'Unable to get a visitor detail'})
    }else{
      res.send({status: 200, results: visitorResponse})
    }
  })
});

// Delete specific data
router.delete('/delete', function(req, res, next) {

  const userId = req.query.userId
  visitorDetail.findByIdAndDelete(userId, (err,visitorResponse)=>{
    if(err){
      res.send({status: 500, message: 'Unable to delete a visitor detail'})
    }else{
      res.send({status: 200, results: 'Delete Successfully'})
    }
  })
});

// Send Data 
router.post('/add', function(req, res, next) {

  let visitorObj = new visitorDetail({
    firstName: req.body.firstName,
    lastName:  req.body.lastName,
    gender:  req.body.gender,
    dateOfBirth:  req.body.dateOfBirth,
    age:  req.body.age,
    emailAddress:  req.body.emailAddress,
    phoneNumber:  req.body.phoneNumber,
    address:  req.body.address,
    city:  req.body.city,
    state:  req.body.state,
    height:  req.body.height,
    weight:  req.body.weight
  });

  visitorObj.save(function(err, visitorObj){
    if(err){
      res.send({status: 500, message: 'Add Visitor Failed'})
    }else{
      res.send({status: 200, message: 'Visitor Added Successfully', visitorObj})
    }
  })
});


module.exports = router;
