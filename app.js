var express       = require('express');
var cors          = require('cors');
var path          = require('path');
var passport      = require('passport');
var cookieParser  = require("cookie-parser");
var jwt           = require('jsonwebtoken');
var expressJWT    = require('express-jwt');
var app           = express();
var port          = process.env.PORT || 3000;
var router        = express.Router();
var routes        = require('./routes/routes');
var api			      = require('./routes/api');
var http          = require('http').createServer(app);
var bodyParser    = require('body-parser');
var morgan        = require('morgan');
var mongoose      = require('mongoose');
var User          = require('./models/user');
var secret        = require('./config/config').secret;
var multer        = require('multer');
var s3            = require('multer-s3');
var uuid          = require('uuid');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/golfapp');

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

var upload = multer({
  storage: s3({
    // the folder within the bucket
    dirname: 'uploads',
    // set this to your bucket name
    bucket: 'gurneytest',
    // your AWS keys
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // the region of your bucket
    region: 'eu-west-1',
    // IMPORTANT: set the mime type to that of the file
    contentType: function(req, file, next) {
      next(null, file.mimetype);
    },
    // IMPORTANT: set the file's filename here
    // ALWAYS CHANGE THE FILENAME TO SOMETHING RANDOM AND UNIQUE
    // I'm using uuid (https://github.com/defunctzombie/node-uuid)
    filename: function(req, file, next) {
      // Get the file extension from the original filename
      var ext = '.' + file.originalname.split('.').splice(-1)[0];
      // create a random unique string and add the file extension
      var filename = uuid.v1() + ext;
      next(null, filename);
    }
  })
});

// This will upload a single file.
app.post('/api/upload/single', upload.single('file'), function(req, res) {
  res.status(200).json({ filename: req.file.key });
});
  
//   if(!req.file) {
//     return res.status(400).json({ error: "No file supplied" });
//   }

//   upload.single('file'), function(req, res) {
//       res.status(200).json({ filename: req.file.key });
//   };
// });

http.listen(port)
console.log('Server started on port ' + port + '…')

