var express       = require('express');
var cors          = require('cors');
var path          = require('path');
var passport      = require('passport');
var cookieParser  = require("cookie-parser");
var jwt           = require('jsonwebtoken');
var expressJWT    = require('express-jwt');
var app           = express();
var port          = 3000;
var router        = express.Router();
var routes        = require('./routes/routes');
var api			      = require('./routes/api');
var http          = require('http').createServer(app);
var bodyParser    = require('body-parser');
var morgan        = require('morgan');
var mongoose      = require('mongoose');
var User          = require('./models/user');
var secret        = require('./config/config').secret;


mongoose.connect('mongodb://localhost/golfapp');

require('./config/passport')(passport);

// app.use(methodOverride(function(req, res){
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     var method = req.body._method
//     delete req.body._method
//     return method
//   }
// }));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(morgan('dev'))
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }))

app.use(router);
app.use('/',  routes);
app.use('/api' , api);

app.use(express.static(__dirname + '/public'));

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

http.listen(port)
console.log('Server started on port ' + port + '…')

