var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var notificationSchema = new Schema({
    body   : String,
    title: String,
    date : Date,
    ownerId : Number,
    type : String,
    read : Number,
    submissionId : Number

});

// Duplicate the ID field.
notificationSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
notificationSchema.set('toJSON', {
    virtuals: true
});



var Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
