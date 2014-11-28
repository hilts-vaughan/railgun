var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var answerSchema = new Schema({
    body   : String,
    score   : Number,
    authorId   : Number,
    status   : Number,
    title	: string,
    submissionDate   : Date,
    "questionData": String
});

// Duplicate the ID field.
answerSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
answerSchema.set('toJSON', {
    virtuals: true
});



var AnswerSubmission = mongoose.model('AnswerSubmission', answerSchema);

module.exports = AnswerSubmission;
