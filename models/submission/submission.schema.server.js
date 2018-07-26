var mongoose = require('mongoose');
var submissionSchema = mongoose.Schema({
  username: String,
  quizId: String,
  answers: Object,
  timeSubmitted:   { type : Date, default: Date.now }
}, {collection: 'submissions'});
module.exports = submissionSchema;