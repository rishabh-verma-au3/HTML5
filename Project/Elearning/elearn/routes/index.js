var express = require('express');
var router = express.Router();
var Class=require("../models/class")
// console.log(Class)
/* GET home page. */
router.get('/', function(req, res, next) {
     
  console.log('got no chill')
  Class.getClasses(function(err,classes){
    // console.log( classes)
    res.render('index', { classes: classes });
  },3)
   
  console.log('got chill')
  

 
});


module.exports = router;
