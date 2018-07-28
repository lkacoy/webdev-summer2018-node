var mongoose = require('mongoose');
var submissionSchema = require('./submission.schema.server');
var submissionModel = mongoose.model(
  'SubmissionModel',
  submissionSchema
);

function findSubmissionsForQuiz(quizId) {
  return submissionModel.find({quizId: quizId});
}

function findSubmissionsForUser(username) {
  return submissionModel.find({username: username});
}

function submitQuiz(submission, quizId, username) {
  return submissionModel.create({
    quizId: quizId,
    username: username,
    answers: submission
  });
}

function findQuizSubmissionsByStudent(quizId, student) {
  return submissionModel.find({
      quizId: quizId,
      username: student
  })
}

function findSubmissionById(studentId, submissionId) {
  return submissionModel.find({
      username: studentId,
      _id: submissionId
  });
}

function findSubmission( submissionId, quizId) {
    return submissionModel.findOne({
        _id: submissionId,
        quizId: quizId
    })
}

module.exports = {
  submitQuiz: submitQuiz,
  findSubmissionsForQuiz: findSubmissionsForQuiz,
  findSubmissionsForUser: findSubmissionsForUser,
  findSubmissionById: findSubmissionById,
  findQuizSubmissionsByStudent: findQuizSubmissionsByStudent,
  findSubmission: findSubmission
};