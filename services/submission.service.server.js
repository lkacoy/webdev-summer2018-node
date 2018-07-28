module.exports = function (app) {

    app.post('/api/quiz/:quizId/student/:studentId/submission', createSubmission);
    app.get('/api/quiz/:quizId/student/:studentId/submission', getSubmissionsByStudentId);
    app.get('/api/quiz/:quizId/student/:studentId/submission/:submissionId', getSubmissionById);
    app.get('/api/quiz/:quizId/submission/:submissionId', getSubmission);


    var submissionModel = require('../models/submission/submission.model.server');

    function createSubmission(req, res) {
        var quizId = req.params.quizId;
        var studentId = req.params['studentId'];
        var submission = req.body;
        submissionModel
            .submitQuiz(submission, quizId, studentId)
            .then(function (submission) {
                res.json(submission);
            })
    }

    function getSubmissionById(req, res) {
        var quizId = req.params.quizId;
        var studentId = req.params['studentId'];
        var submissionId = req.params['submissionId'];
        submissionModel
            .findSubmissionById(studentId,submissionId)
            .then(function (submissions) {
                res.json(submissions);
            });
    }

    function getSubmissionsByStudentId(req, res) {
        var quizId = req.params.quizId;
        var studentId = req.params['studentId'];
        submissionModel
            .findQuizSubmissionsByStudent(quizId, studentId)
            .then(function (submissions) {
                res.json(submissions);
            });

    }

    function getSubmission(req, res) {
        var quizId = req.params.quizId;
        var submissionId = req.params['submissionId'];
        submissionModel
            .findSubmission(submissionId, quizId)
            .then(function (submissions) {
                res.json(submissions);
            });
    }
}