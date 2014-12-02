/*
    Routing Resource:  /broadcast:message

    Resources Provided: Provides endpoint for broadcasting messages to users.

    Further resources provided are described the actual endpoint descriptions.

*/
var User = require('./../models/user');
var gcm = require('node-gcm');

module.exports = function(server) {


   /*
      A general POST hook for the resource:   /broadcast/:message

      Given the message and address in the payload, sends a broadcast
      messages to every user within the address.


      Parameters are documented as per Restify.

  */
  server.post('/broadcast/:message', function (req, res, next) {

      var msg = req.params.message;
      var address = req.params.address;

      var sender = new gcm.Sender('AIzaSyDxPx07sSVNPThuCwI69fLlc3MiOXikpkY');

      // create a message with default values
      var message = new gcm.Message();
      message.addData('title','Help Me! Laurier');
      message.addData('message', msg);

      // Setup the address endpoints
      var registrationIds = [];
      registrationIds.push(address);

      sender.send(message, registrationIds, 4, function(err, result){
        console.log(result);
        res.send("OK");
      })



  });


}
