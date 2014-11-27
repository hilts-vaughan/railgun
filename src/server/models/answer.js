var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var answerSchema = new Schema({
    body   : String,
    score   : Number,
    authorId   : Number,
    status   : Number,
    submissionDate   : Date,
    id : Number,
    "questionData": String
});

var AnswerSubmission = mongoose.model('AnswerSubmission', answerSchema);

module.exports = AnswerSubmission;
