/*
    Routing Resource:  /submissions/questions
                       /submissions/questions/:id

    Resources Provided: This route provides resources to the questions endpoints.
    It allows getting questions by ID, fetching entire packages of questions, and posting
    new ones.

    Further resources provided are described the actual endpoint descriptions.

*/

var QuestionSubmission = require('./../models/question');

module.exports = function(server) {

  server.get('/submissions/questions', function (req, res, next) {

      var filter = {};

      for(var k in req.query)
        filter[k] = req.query[k]; 

      console.log(filter);

      // Uses the Mongoose DB connection to find it
      QuestionSubmission.find(filter, function(exception, questions){
          if(exception) {
            res.send({}, 500)
          }
          else {
            res.send(questions);
          }

      });

  });

  server.get('/submissions/questions/:id', function (req, res, next) {


      // Uses the Mongoose DB connection to find it
      QuestionSubmission.findById(
        req.params.id
    , function(exception, questions){
          if(exception) {
            res.send({}, 500)
          }

          else {
            res.send(questions);
          }

      }); // end database fetch



  }); // end /submissions/questions/:id



  server.post('/submissions/questions', function (req, res, next) {

      // Uses the Mongoose DB connection to find it
      var x = req.params;

      // Setup defaults
      x.submissionDate = new Date();
      x.categoryId = x.categoryId || 0;


      var newQuestion = new QuestionSubmission(x);

      newQuestion.save(function(exception, data) {
        res.send(x);
      });


  });




}
