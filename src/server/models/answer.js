var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var answerSchema = new Schema({
    body   : String,
    title: String,
    score   : {type: Number, default: 0},
    authorId   : Number,
    status   : {type: Number, default: 0},
    submissionDate   : Date,
    categoryId : {type: Number, default: 0}
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
