var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var musiqualityDb;
var config = require('./config.json');
var MongoClient = require('mongodb').MongoClient;


// Connection URL
var url = 'mongodb://localhost:27017/Musiquality';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  musiqualityDb = db;
  var port = 8100;
  app.listen(port, function () {
    console.log(`App listening on port ${port}...`);
  });

  console.log("Connected correctly to server");

});


app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSession({secret: 'picklejuice', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new googleStrategy({
  clientID: config.googleClientId,
  clientSecret: config.googleClientSecret,
  callbackURL: "http://localhost:8100/auth/google/callback"
}, function (accesToken, refreshToken, profile, cb) {
  // console.log(profile);
  cb(null, profile);
}));

passport.use(new facebookStrategy({
  clientID: config.facebookClientId,
  clientSecret: config.facebookClientSecret,
  callbackURL: "http://localhost:8100/auth/facebook/callback"
}, function (accesToken, refreshToken, profile, cb) {
  console.log(profile);
  cb(null, profile);
}));


app.use('/', express.static(__dirname + '/www'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

passport.serializeUser(function (user, done) {
  // console.log(user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // console.log(user);
  done(null, user);
});

app.get('/');

app.get('/auth/google',
  passport.authenticate('google', {scope: ['profile']}));

app.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/#/page6'}),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/tabs/page8');
  });

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/#/page6'}),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/tabs/page8');
  });

app.get('/api/like', (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    var collection = db.collection('user');
    collection.find({userId: req.user.id}).toArray(function(err, docs){
      res.json(docs);
      console.log(err, docs);
    });
  });
});

app.post('/api/like', (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    var collection = db.collection('user');
    // Insert some documents
    var likeArtist = req.body;
    likeArtist.userId = req.user.id;
    console.log(likeArtist);
    collection.insertOne(
      likeArtist,
      function (err, result) {
        //assert.equal(err, null);

        res.end();
      }
    );
  });
});

app.put('/api/like/:artistName', (req, res, next) => {

});

app.delete('/api/like/:artistName', (req, res, next) => {

});

app.post('/api/feedback', (req, res, next) => {

});





