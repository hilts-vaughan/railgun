var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var questionSchema = new Schema({
    body   : String,
    score   : Number,
    authorId   : Number,
    status   : Number,
    submissionDate   : Date,
    id : Number,
    "questionData": String
});

var QuestionSubmission = mongoose.model('QuestionSubmission', questionSchema);

module.exports = QuestionSubmission;
