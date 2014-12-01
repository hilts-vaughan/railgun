/*
	The question transit controller is responsible for managing the transmission of all the various notifications that need to be placed.
 */

// Imports required for this class
var NotificationController = require('./notificationController')
var User = require('./../models/user');
var mongoose = require('mongoose');
var Notification = mongoose.model('Notification');

module.exports = {


	/*
		Takes a new question has been sent from another source and requests a processing.
		@param	question 	The new question that needs to be processed or answer.
											In all cases, the question is the initial tied element.

	 */
	processNewSubmission: function processNewSubmission(question, type, id) {

		User.find({}, function(exception, users) {

			var controller = NotificationController;

			console.log("Preparing to send a notification because of changes...");

			var sendList = [];
			var notifyList = [];

			// For each user we find, be sure to add them to the queue
			users.forEach(function(user){

				// Add to send list
				var token = user.pushToken;

				// Generate a notification
				var userNotification = new Notification();
				userNotification.title = question.title
				userNotification.body = question.body;
				userNotification.date = new Date();
				userNotification.ownerId = user._id;
				userNotification.type = type;
				userNotification.read = 0;
				userNotification.submissionId = id;

				userNotification.save();
				controller.sendNotification(userNotification, token);


			});



		});

	}


};
