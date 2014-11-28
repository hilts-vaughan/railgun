var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    name : String,
    registrationDate: Date
});

// Duplicate the ID field.
userSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});



var User = mongoose.model('User', userSchema);
module.exports = User;
