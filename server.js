var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/Musiquality';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    // insertDocuments(db, function() {
    //     updateDocument(db, function(){
    //         removeDocument(db, function() {
    findDocuments(db, function () {
        db.close();
    });
    //         });
    //     });
    // });
});

var movies = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/api/movies', (req, res) => {
    res.send(movies);
});

app.get('/api/searchmovie/:title', (req, res) => {
    console.log('searching', req.params);
    var title = req.params.title;
    var found = [];
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].title === title) {
            found = [movies[i]];
        }
    }
    console.log(found);
    res.json(found).end();
});


app.post('/api/savemovie', (req, res) => {
    console.log(req.body);
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection('movie');

        // Insert some documents
        collection.insertOne(
            req.body, function (err, result) {
                assert.equal(err, null);
                movies.push(req.body);
                res.send(movies);
                // TODO: close the database!
            });

    });



});

app.post('/api/removemovie', (req, res) => {
    console.log(req.body);
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].title === req.body.title) {
            movies.splice(i, 1);
        }
    }

    fs.writeFile('movies.json', JSON.stringify(movies), (err) => {
        if (err) res.send("Wrong");
    });

    res.json(movies).end();

});

app.post('/api/checkout', (req, res) => {
    console.log(req.body);
    var title = req.body.title;
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].title === title) {
            if (movies[i].checkedOut === false) {
                movies[i].checkedOut = true;
            }
            else if (movies[i].checkedOut === true) {
                movies[i].checkedOut = false;
            }
        }
    }

    fs.writeFile('movies.json', JSON.stringify(movies), (err) => {
        if (err) res.send("Wrong");
    });

    res.json(movies).end();

});

var port = 3343;
app.listen(port, function () {
    console.log(`App listening on port ${port}...`);
});
