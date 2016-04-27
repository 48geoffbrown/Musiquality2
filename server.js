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
    if(err){
        console.log(err);
        process.exit(1);
    }
    musiqualityDb = db;
    var port = 3343;
    app.listen(port, function () {
        console.log(`App listening on port ${port}...`);
    });

    console.log("Connected correctly to server");

});


app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession({secret: 'picklejuice', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new googleStrategy({
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: "http://localhost:3343/auth/google/callback"
}, function(accesToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null, {});
}));

passport.use(new facebookStrategy({
    clientID: config.facebookClientId,
    clientSecret: config.facebookClientSecret,
    callbackURL: "http://localhost:3343/auth/facebook/callback"
}, function(accesToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null, {});
}));


app.use('/', express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// fs.readFile('likes.json', 'utf8', (err, data) => {
// 	movies = JSON.parse(data);
// 	console.log(movies);
// });

var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('movie');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        assert.equal(1, docs.length);
        console.log("Found the following records");
        console.dir(docs);
        movies = docs;
        callback(docs);
    });

};
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
app.get('/');

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/#/page6');
    });

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/#/page6');
    });

app.get('/login', (req, res, next) => {

});

app.get('/api/like', (req, res, next) => {

});

app.post('/api/like/:artistName', (req, res, next) => {

});

app.put('/api/like/:artistName', (req, res, next) => {

});

app.delete('/api/like/:artistName', (req, res, next) => {

});

app.post('/api/feedback', (req, res, next) => {

});





