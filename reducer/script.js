var express = require('express');
var moment = require('moment');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

var tweets_of_the_day;
var date = moment().subtract(1, 'days').format("YYYY-MM-DD");
console.log(date);
var url = "mongodb://pipibigdata:pipipipi1@ds163103.mlab.com:63103/epfbigdata";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("epfbigdata");
  dbo.collection("tweets_of_the_day").find({ 'datetime' : { '$regex' : date, '$options' : 'i' } }).toArray(function(err, result) {
    if (err) throw err;
      console.log(result);
      tweets_of_the_day = result;

      var map = function (array, callback) {
        var new_array = [];

        array.forEach(function (element, index, array) {
           new_array.push(callback(element));
        });

        return new_array;

    };

    var filter = function (array, callback) {

        var filtered_array = [];

        array.forEach(function (element, index, array) {
            if (callback(element, index, array)) {
                filtered_array.push(element);
            }
        });

        return filtered_array;

    };

    var reduce = function (array, callback, initial) {
        var accumulator = initial || 0;

        array.forEach(function (element) {
           accumulator = callback(accumulator, array[i]);
        });

        return accumulator;
    };

    var tot_grippe = 0;
    var tot_angine = 0;
    var tot_rhume = 0;
    var tot_mal_gorge = 0;
    var tot_toux = 0;
    var tot_nez_coule = 0;
    var tot_fievre = 0;

     var Grippe = map(tweets_of_the_day, function (maladie) {
         return maladie.word;
     }).filter(function (maladie) {
        return maladie === "grippe";
    }).reduce(function () {
        tot_grippe++;
        return tot_grippe;
    }, 0);

     var Angine = map(tweets_of_the_day, function (maladie) {
         return maladie.word;
     }).filter(function (maladie) {
        return maladie === "angine";
    }).reduce(function () {
        tot_angine++;
        return tot_angine;
    }, 0);


     var Rhume = map(tweets_of_the_day, function (maladie) {
         return maladie.word;
     }).filter(function (maladie) {
        return maladie === "rhume";
    }).reduce(function () {
        tot_rhume++;
        return tot_rhume;
    }, 0);

    var Toux = map(tweets_of_the_day, function (maladie) {
     return maladie.word;
    }).filter(function (maladie) {
       return maladie === "toux";
    }).reduce(function () {
     tot_toux++;
       return tot_toux;
    }, 0);

    var Mal_Gorge = map(tweets_of_the_day, function (maladie) {
     return maladie.word;
    }).filter(function (maladie) {
       return maladie === "mal de gorge";
    }).reduce(function () {
     tot_mal_gorge++;
       return tot_mal_gorge;
    }, 0);

    var Nez_Coule = map(tweets_of_the_day, function (maladie) {
     return maladie.word;
    }).filter(function (maladie) {
       return maladie === "nez qui coule";
    }).reduce(function () {
     tot_nez_coule++;
       return tot_nez_coule;
    }, 0);

    var Fievre = map(tweets_of_the_day, function (maladie) {
     return maladie.word;
    }).filter(function (maladie) {
       return maladie === "fievre";
    }).reduce(function () {
     tot_fievre++;
       return tot_fievre;
    }, 0);


    console.log("Grippe : " + tot_grippe + " | Angine : " + tot_angine + " | Rhume : " + tot_rhume + " | Toux : " + tot_toux + " | Mal_Gorge : " + tot_mal_gorge + " | Nez Coule : " + tot_nez_coule + " | Fievre : " + tot_fievre);

          var json = {
            "date" : date,
            "Grippe" : tot_grippe,
            "Angine" : tot_angine,
            "Rhume" : tot_rhume,
            "Toux" : tot_toux,
            "Mal_Gorge" : tot_mal_gorge,
            "Nez_Coule" : tot_nez_coule,
            "Fievre" : tot_fievre,
          }
          MongoClient.connect('mongodb://pipibigdata:pipipipi1@ds163103.mlab.com:63103/epfbigdata', (err, client) => {
            db = client.db('epfbigdata');
            db.collection('map_reduce').save(json, (err, result) => {
              if (err) return console.log(err);
              console.log('saved to database');
              process.exit();
            })
          });

  });
});
