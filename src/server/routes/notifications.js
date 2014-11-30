/*
    Routing Resource:  /submissions/answers
                       /submissions/answers/:id

    Resources Provided: This route provides resources to the answers endpoints.
    It allows getting answers by ID, fetching entire packages of answers, and posting
    new ones.

    Further resources provided are described the actual endpoint descriptions.

*/

var Notification = require('./../models/notification');
var User = require('./../models/user');

module.exports = function(server) {



  server.post('/notifications/register', function (req, res, next) {

        var identity = req.headers['auth'];
        var pushToken = req.params.token;

        console.log("Attempting to find user w/ identity " + identity + " and using token " + pushToken);

         User.findOne({name: identity}, function(exception, user) {

            console.log(exception);

            // Work with our user
            user.pushToken = pushToken;
            user.save();

            console.log(identity + " has been registered with token " + pushToken);

            res.send({status: true});
         });


  });




}
