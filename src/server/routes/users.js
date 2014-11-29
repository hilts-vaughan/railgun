/*
    Routing Resource:  /users

    Resources Provided: This route provides resources to the answers endpoints.
    It allows getting answers by ID, fetching entire packages of answers, and posting
    new ones.

    Further resources provided are described the actual endpoint descriptions.

*/
var User = require('./../models/user');

module.exports = function(server) {



  server.get('/login/:identity', function (req, res, next) {

      // We have a request to create a new users
      var identity = req.params.identity;
      req.params.name = req.params.identity;
      req.params.score = 0;

      console.log(req.headers.xero);

      if(identity) {

        User.findOne({name: identity}, function(exception, user) {

            // If the user does not exist, create them first.
            if(!user) {
                console.log(req.params);
                var newUser = new User(req.params);
                console.log("Creating new user " + identity);
                newUser.save();
            }

            res.send({status: "identity OK"})

        });

      }

      else {
        res.send({status: "No identity provided"});
      }


  });


}
