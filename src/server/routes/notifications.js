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
var _ = require('underscore');



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


  server.get('/notifications', function (req, res, next) {

    var identity = req.headers['auth'];
    User.findOne({name: identity}, function(exception, user) {

      if(user) {
        // We have our user, try and find every notification tied to them
        Notification.find({ownerId: user._id}, function(exception, notifications) {

          var sendList = [];
          notifications.forEach(function(notification) {
            if(notification.read != 1)
              sendList.push(notification);
          });

          res.send(sendList);

        });
      } else {
        res.send([]);
      }


    });

  });


  server.get('/notifications/:id', function (req, res, next) {

    var id = req.params.id;
    console.log(id);
    Notification.findById(id, function(exception, notification) {
      notification.read = 1;
      notification.save();
      res.send("OK");
    });

  });




}
