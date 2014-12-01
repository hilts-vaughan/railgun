var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    name : String,
    registrationDate: Date,
    pushToken : String
});

// Create a virtualized accessor for ease of access on the clients
userSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});


// Export the constructed model for clients to use
var User = mongoose.model('User', userSchema);
module.exports = User;
