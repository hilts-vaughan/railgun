/*
    Routing Resource:  /users

    Resources Provided: This route provides resources to the answers endpoints.
    It allows getting answers by ID, fetching entire packages of answers, and posting
    new ones.

    Further resources provided are described the actual endpoint descriptions.

*/
var User = require('./../models/user');
var gcm = require('node-gcm');

module.exports = function(server) {



  server.post('/broadcast/:message', function (req, res, next) {

      var msg = req.params.message;

      var sender = new gcm.Sender('AIzaSyDxPx07sSVNPThuCwI69fLlc3MiOXikpkY');
      
      // create a message with default values
      var message = new gcm.Message();
      message.addData('title','Help Me! Laurier');
      message.addData('message', "There's a new notification for you to view.");


      var registrationIds = ['APA91bFnHzsbGFv2g0Fn0Eq0B4TkWx5ITzxhjgM4N6Y8RHAputP5Ymq5z4sl1zl4HkUwoGbyL6sIv7IqOHCOV4vL3CjnAhuS7ixocehm4ixFPU4DnW1J7Xc9i92WW6o21GlzYGyEkZ-uTgxbktqABuFk-2UBa_po0zvL9A5R6a9ifZT0ebg4wOs'];
      sender.send(message, registrationIds, 4, function(err, result){
        console.log(result);
        res.send("OK");
      })



  });


}
