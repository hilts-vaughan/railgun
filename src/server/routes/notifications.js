/*
    Routing Resource:  /submissions/answers
                       /submissions/answers/:id

    Resources Provided: This route provides resources to the answers endpoints.
    It allows getting answers by ID, fetching entire packages of answers, and posting
    new ones.

    Further resources provided are described the actual endpoint descriptions.

*/

var Notification = require('./../models/notification');

module.exports = function(server) {


  /*
      Purpose: Provides a set of reports pulled down from the active database that are accomapnied to a certain question type.

      Notes:   Resources provided
  */
  server.get('/notifications', function (req, res, next) {
    

      var filter = {};

      for(var k in req.query)
        filter[k] = req.query[k]; 

      Notification.find(filter, function(exception, notifications) {

      });

  });


  server.post('/notifications/register', function (req, res, next) {
    
        var identity = req.headers['auth']; 
        var pushToken = req.params.token;

         User.find({name: identity}, function(exception, user) {

            // Work with our user
            user.pushToken = pushToken;
            user.save();

            res.send({status: true});
         });


  });




}
