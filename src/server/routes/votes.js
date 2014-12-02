/*
    Routing Resource:
                       /votes/:id

    Resources Provided: This route provides resources to the votes endpoints.


*/

var AnswerSubmission = require('./../models/answer');
var QuestionSubmission = require('./../models/question');
var User = require('./../models/user');

module.exports = function(server) {


  /*
      Purpose: Provides a set of votes on a specific piece of content

      Notes:   Resources provided
  */
  server.post('/votes/:id', function (req, res, next) {

    var id = req.params.id;
    var isUpvote = req.params.isUpvote
    var identity = req.headers['auth'];

    QuestionSubmission.findById(id, function(exception, question){

      AnswerSubmission.findById(id, function(exception, answer) {
          var submission = question || answer;

          console.log(submission);

          if(submission && submission.voteIds.indexOf(identity) == -1) {
              User.find({name: identity}, function(exception, x) {

                // Take the submission we have found and increase the score

                if(isUpvote)
                  submission.score++;
                else
                  submission.score--;

                submission.voteIds.push(identity);

                console.log(identity);

                // Save the submission
                submission.save();

                // Let the user know
                res.send({status: true, score: submission.score});

                console.log(identity + " has voted submission with Id " + id);


              })
          } else {
              res.send({status: false});
          }


      });

    });



  });




}
