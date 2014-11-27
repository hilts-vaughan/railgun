/*
    Describes the routing for the
*/

var QuestionSubmission = require('./../models/question');
var AnswerSubmission = require('./../models/answer');

module.exports = function(server) {

  server.get('/submissions/questions', function (req, res, next) {
      var list = [];
      for(var i = 0; i < 100; i++) {
          list.push({
            "body": "42 doge",
            "title": "What is the answer to life and everything?",
            "categoryId": 1,
            "postCount": 9001
          })
      }
      res.send(list);
  });

  server.get('/submissions/questions/:id', function (req, res, next) {
        var id = req.params.id;
        var list = {
          "body": "42 doge",
          "title": "What is the answer to life and everything?",
          "categoryId": 1,
          "postCount": 9001,
          "score": 95382647,
          "author": "Vaughan Doge King",
          "id": id
        }

      res.send(list);

  });


}
