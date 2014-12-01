
/*
	NotificationController

  This module is responsible for taking care of notifications and distributing them.
  It is not respondible for finding the actual destinations but instead simply deals
  with the already created packages.




 */

// Import the node GCM module for sending push notifications
var gcm = require('node-gcm');

module.exports = {

  /*
      Sends the notification of the specific type to the given
      token address through the GCM provider.

      @param  notification  The 'Notification' model that is to be sent to the user address.
      @param  address       The address (token registration ID) in which to send the notificaton to.
  */
  sendNotification: function sendNotification(notification, address) {

      var GCM_PROJECT_KEY = 'AIzaSyDxPx07sSVNPThuCwI69fLlc3MiOXikpkY';
      var sender = new gcm.Sender(GCM_PROJECT_KEY);

      // Create a message with default values
      var message = new gcm.Message();
      message.addData('title', 'Help Me! Laurier');
      message.addData('message', "You have a new notification awaiting you.");

      var registrationIds = [];
      registrationIds.push(address);

      // Using the GCM provider, send the message
      sender.send(message, registrationIds, 4, function(err, result) {
        console.log("A push notification to the address was succesfully sent.");
        res.send("OK");
      })


    } // end sendNotification


}
