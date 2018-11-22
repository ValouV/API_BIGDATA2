var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

//save tweets from py
router.post('/save', function(req, res) {
    var word = req.body.word;
    var datetime = req.body.datetime;
    if((typeof word != 'undefined') || (typeof datetime != 'undefined')){
      var json = {
        "word" : word,
        "datetime" : datetime
      }
      MongoClient.connect('mongodb://pipibigdata:pipipipi1@ds163103.mlab.com:63103/epfbigdata', (err, client) => {
        db = client.db('epfbigdata');
        db.collection('tweets_of_the_day').save(json, (err, result) => {
          if (err) return console.log(err);
          console.log('saved to database');
        })
      });
      res.send("ok");
    } else {
      res.send("ko");
    }
});

router.get('/all_reduce', function(req, res) {
  var url = "mongodb://pipibigdata:pipipipi1@ds163103.mlab.com:63103/epfbigdata";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("epfbigdata");
    dbo.collection("map_reduce").find({},{"Grippe":1, "_id":0}).toArray(function(err, result) {
      res.send(result);
    });
});
});

router.get('/last_words', function(req, res) {
  var url = "mongodb://pipibigdata:pipipipi1@ds163103.mlab.com:63103/epfbigdata";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("epfbigdata");
    console.log(dbo.collection("tweets_of_the_day").find().sort({_id:-1}).limit(5).toArray());
    dbo.collection("tweets_of_the_day").find().sort({_id:-1}).limit(5).toArray(function(err, result) {
      res.send(result);
    });
});


});

module.exports = router;
