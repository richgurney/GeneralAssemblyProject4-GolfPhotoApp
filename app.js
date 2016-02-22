var express       = require('express');
var app           = express();
var port          = 3000;
var router        = express.Router();
var routes        = require('./routes/routes');
var api			      = require('./routes/api');
var http          = require('http').createServer(app)
var bodyParser    = require('body-parser')
var morgan        = require('morgan')
var mongoose      = require('mongoose');

mongoose.connect('mongodb://localhost/golfapp');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }))

app.use(router);
app.use('/',  routes);
app.use('/api' , api);

app.use(express.static(__dirname + '/public'));

http.listen(port)
console.log('Server started on port ' + port + '…')

