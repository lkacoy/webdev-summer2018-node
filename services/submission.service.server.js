module.exports = function (app) {

    app.post('/api/quiz/:quizId/student/:studentId/submission', createSubmission);
    app.get('/api/quiz/:quizId/student/:studentId/submission', getSubmissionsByStudentId);
    app.get('/api/quiz/:quizId/student/:studentId/submission/:submissionId', getSubmissionById);


    var submissionModel = require('../models/submission/submission.model.server');

    function createSubmission(req, res) {
        var quizId = req.params.quizId;
        var studentId = req.params['studentId'];
        var submission = req.body;


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
}