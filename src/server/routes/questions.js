/*
    Routing Resource:  /submissions/questions
                       /submissions/questions/:id

    Resources Provided: This route provides resources to the questions endpoints.
    It allows getting questions by ID, fetching entire packages of questions, and posting
    new ones.

    Further resources provided are described the actual endpoint descriptions.

*/

// Model imports
var QuestionSubmission = require('./../models/question');
var AnswerSubmission = require('./../models/answer');

    /*
        Fetches a list of all questions according to the given
        filters.
    */
module.exports = function(server) {

  server.get('/submissions/questions', function (req, res, next) {

      // Generates a filter for the questions
      var filter = {};
      for(var k in req.query)
        filter[k] = req.query[k];

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

    /*
        Gets detailed information about a question with the given ID
    */
  server.get('/submissions/questions/:id', function (req, res, next) {


      // Uses the Mongoose DB connection to find it
      QuestionSubmission.findById(
        req.params.id
    , function(exception, questions){


        if(!exception && questions) {

            // Fetch all answers that are similar
            AnswerSubmission.find({parentQuestionId: req.params.id}, function(exception, answers) {
                var json = questions.toObject();
                json.answers = answers;
                res.send(json);
            })

        }
        else {
          res.send(404);
        }


      }); // end database fetch



  }); // end /submissions/questions/:id


    /*
        Given the question payload, attempts to POST a generated
        question to the server for serving.
    */
  server.post('/submissions/questions', function (req, res, next) {

      // Uses the Mongoose DB connection to find it
      var x = req.params;

      // Setup defaults
      x.submissionDate = new Date();
      x.categoryId = x.categoryId || 0;
      x.author = req.headers['auth'];

      var newQuestion = new QuestionSubmission(x);

      newQuestion.save(function(exception, data) {
        x.id = data._id;

        // Submit to transit
        server.transit.processNewSubmission(newQuestion, 'question', newQuestion._id);


        res.send(x);


      });


  });




}
