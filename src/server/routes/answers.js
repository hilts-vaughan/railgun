/*
    Routing Resource:  /submissions/answers/:id


    Resources Provided: This route provides resources to the answers endpoints.
                        It allows posting answers by question ID,

    Further resources provided are described the actual endpoint descriptions.

*/

// Imports required by node
var AnswerSubmission = require('./../models/answer');
var QuestionSubmission = require('./../models/question');


module.exports = function(server) {


  /*
      A general POST hook for the resource:   /submissions/answers/:id

      Given an Id, it will post a question given the payload and persist
      it to the database.

      Parameters are documented as per Restify.

  */
  server.post('/submissions/answers/:id', function (req, res, next) {

      // Uses the Mongoose DB connection to find it
      var x = req.params;

      // Setup defaults
      x.submissionDate = new Date();
      x.parentQuestionId = req.params.id;
      x.author = req.headers['auth'];

      var newAnswer = new AnswerSubmission(x);

      QuestionSubmission.findById(req.params.id, function(exception, question) {

          // Attach the question metadata to the answer so they are linked together
          if(question) {
                x.title = question.title;
                newAnswer.save(function(exception, data) {
                  console.log(data);
                  server.transit.processNewSubmission(x, 'answer', newAnswer.parentQuestionId);
                  res.send(x);
                });
          }
          else {
            res.send(500);
          }


      });




  });


}
