var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var questionSchema = new Schema({
    body   : String,
    score   : Number,
    authorId   : Number,
    status   : Number,
    submissionDate   : Date,
    "questionData": String
});


// Duplicate the ID field.
questionSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
questionSchema.set('toJSON', {
    virtuals: true
});


var QuestionSubmission = mongoose.model('QuestionSubmission', questionSchema);



module.exports = QuestionSubmission;
