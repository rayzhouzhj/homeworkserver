var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var fs = require('fs');
  fs.readFile('data/chinese.json', 'utf8', function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);

    // res.send(obj.questions[0]);
    res.render('index', {});
  });
});

let qindex = 0;

/* GET home page. */
router.get('/getquestion', function (req, res, next) {
  var fs = require('fs');
  fs.readFile('data/chinese.json', 'utf8', function (err, data) {
    if (err) throw err;
    var json = JSON.parse(data);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(json.questions[qindex]);
    qindex++;
    if (qindex >= json.questions.length) qindex = 0;
    // res.send(json.questions[Math.floor(Math.random() * json.questions.length)]);
  });
});

/* GET home page. */
router.get('/addquestion', function (req, res, next) {
  res.render('addquestion', {});
});

module.exports = router;
