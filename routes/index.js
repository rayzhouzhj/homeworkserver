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
router.get('/getquestion/subject/:subject/type/:type', function (req, res, next) {

  var type = req.params.type;
  var subject = req.params.subject;
  var limit = req.params.limit;

  var fs = require('fs');
  fs.readFile(`data/${subject}.json`, 'utf8', function (err, data) {
    if (err) throw err;
    var json = JSON.parse(data);

    // console.log(json);
    let output = json.questions.filter(question => { 
      // console.log(question.type);
      return question.type == type;
    });
    // console.log(output);
    if (qindex >= output.length) qindex = 0;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(output[qindex]);
    qindex++;
    // res.send(json.questions[Math.floor(Math.random() * json.questions.length)]);
  });
});

/* GET home page. */
router.get('/addquestion', function (req, res, next) {
  res.render('addquestion', {});
});

module.exports = router;
