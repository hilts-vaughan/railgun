/*
    Routing Resource:  /submissions/answers
                       /submissions/answers/:id

    Resources Provided: This route provides resources to the answers endpoints.
    It allows getting answers by ID, fetching entire packages of answers, and posting
    new ones.

    Further resources provided are described the actual endpoint descriptions.

*/
var AnswerSubmission = require('./../models/answer');
var QuestionSubmission = require('./../models/question');

module.exports = function(server) {



  server.post('/submissions/answers/:id', function (req, res, next) {

      // Uses the Mongoose DB connection to find it
      var x = req.params;

      // Setup defaults
      x.submissionDate = new Date();
      x.parentQuestionId = req.params.id;
      


      var newAnswer = new AnswerSubmission(x);  

      QuestionSubmission.findById(req.params.id, function(exception, question) {

          
          if(question) {            
                newAnswer.save(function(exception, data) {         
                  res.send(x);
                });
          }
          else {
            res.send(500);
          }


      });

     


  });


}
