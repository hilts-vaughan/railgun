var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var questionSchema = new Schema({
    body   : String,
    title: String,
    score   : {type: Number, default: 0},
    authorId   : Number,
    author   : String,
    status   : {type: Number, default: 0},
    submissionDate   : Date,
    categoryId : {type: Number, default: 0},
    voteIds : []
});


// Create a virtualized accessor for ease of access on the clients
questionSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
questionSchema.set('toJSON', {
    virtuals: true
});

// Export the constructed model for clients to use
var QuestionSubmission = mongoose.model('QuestionSubmission', questionSchema);
module.exports = QuestionSubmission;
