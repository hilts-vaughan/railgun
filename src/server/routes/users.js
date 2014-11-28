/*
    Routing Resource:  /users

    Resources Provided: This route provides resources to the answers endpoints.
    It allows getting answers by ID, fetching entire packages of answers, and posting
    new ones.

    Further resources provided are described the actual endpoint descriptions.

*/
var User = require('./../models/user');

module.exports = function(server) {



  server.post('/user/:id', function (req, res, next) {

      // We have a request to create a new users

  });


}
