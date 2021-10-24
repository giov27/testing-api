var express = require('express');
var router = express.Router();

const queueNumber = require('../models/queueNumber.model')

const d = new Date();
let time = `${d.getHours()}:${d.getMinutes()}`;
let date = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`

router.get('/', function(req, res, next) {
  res.send('respond with a');
});

router.post('/', function(req, res, next) {
 queueNumber.find((err,queue)=>{
    if(err){
      res.send({status: 500, message: 'Failed'})
    }else{
      const recordCount = queue.length+1
      // res.send({status: 200, recordCount: recordCount})
      let queueNumObj = new queueNumber({
        queueNum: recordCount,
        date:  date,
        time:  time
      });
      queueNumObj.save(function(err, queueNumObj){
        if(err){
          res.send({status: 500, message: 'Increment Failed'})
        }else{
          res.send({status: 200, message: 'Increment Success', queueNumObj})
        }
      })
    }
  })
});

module.exports = router;
