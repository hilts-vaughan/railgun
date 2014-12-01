// Mongoose imports
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// The schema for the answer
var answerSchema = new Schema({
    body   : String,
    title: String,
    score   : {type: Number, default: 0},
    authorId   : Number,
    author   : String,
    status   : {type: Number, default: 0},
    submissionDate   : Date,
    parentQuestionId : {type: Number},
    voteIds : []
});

// Create a virtualized accessor for ease of access on the clients
answerSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
answerSchema.set('toJSON', {
    virtuals: true
});


// Export the constructed model for clients to use
var AnswerSubmission = mongoose.model('AnswerSubmission', answerSchema);
module.exports = AnswerSubmission;
