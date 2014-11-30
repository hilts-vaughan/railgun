
/*
	This module is responsible for taking care of notifications and distributing them.
 */

var gcm = require('node-gcm');

module.exports = function() {
	
  sendNotification: function sendNotification(notification, address) {

      var sender = new gcm.Sender('AIzaSyDxPx07sSVNPThuCwI69fLlc3MiOXikpkY');

      // create a message with default values
      var message = new gcm.Message();
      message.addData('title', 'Help Me! Laurier');
      message.addData('message', "You have a new notification awaiting you.");


      var registrationIds = [];
      registrationIds.push(address);


      sender.send(message, registrationIds, 4, function(err, result) {
        console.log(result);
        res.send("OK");
      })


    } // end sendNotification


}