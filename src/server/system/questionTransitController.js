/*
	The question transit controller is responsible for managing the transmission of all the various notifications that need to be placed.
 */


var NotificationController = require('./notificationController')
var User = require('./../models/user');
var mongoose = require('mongoose');
var Notification = mongoose.model('Notification');

module.exports = function() {

	var controller = new NotificationController();

	/*
		Takes a new question has been sent from another source and requests a processing.
		@param	question 	The new question that needs to be processed
	 */
	processNewSubmission: function processNewSubmission(question, type) {

		User.find({}, function(exception, users) {

			var sendList = [];
			var notifyList = [];

			// For each user we find, be sure to add them to the queue
			users.forEach(function(user){

				// Add to send list
				var token = user.pushToken;

				// Generate a notification
				var userNotification = new Notification();
				userNotification.title = "Someone posted something!"
				userNotification.body = "Check it out.";
				userNotification.date = new Date();
				userNotification.ownerId = user._id;
				userNotification.type = type;

				userNotification.save();

				controller.sendNotification(userNotification, token);


			});

			// Now, send to the controller this submission to all users that are active

		});

	};



	
	
}