var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
 res.render('mainApp/index.ejs')
})

module.exports = router