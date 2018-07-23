module.exports = function (app) {

  //section apis
  app.post('/api/course/:courseId/section', createSection);
  app.get('/api/course/:courseId/section', findSectionsForCourse);
  app.get('/api/section/:sectionId', findSectionById);
  app.put('/api/section/:sectionId', updateSectionById);
  app.delete('/api/section/:sectionId', deleteSectionById);

  //enrollment apis
  app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
  app.post('/api/student/:studentId/section/:sectionId', enrollOtherStudentInSection);
  app.get('/api/student/section', findSectionsForStudent);
  app.get('/api/student/:studentId/section', findSectionsByStudentId);
  app.delete('/api/student/:studentId/section/:sectionId', unenrollStudent);

  var sectionModel = require('../models/section/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');

  function findSectionsForStudent(req, res) {
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    console.log("hitting enrollment");
    enrollmentModel
      .findSectionsForStudent(studentId)
      .then(function(enrollments) {
        res.json(enrollments);
      });
  }

  function enrollStudentInSection(req, res) {
    var sectionId = req.params.sectionId;
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    var enrollment = {
      student: studentId,
      section: sectionId
    };

    sectionModel
      .decrementSectionSeats(sectionId)
      .then(function () {
        return enrollmentModel
          .enrollStudentInSection(enrollment)
      })
      .then(function (enrollment) {
        res.json(enrollment);
      })
  }

  function enrollOtherStudentInSection(req, res) {
      var sectionId = req.params.sectionId;
      var currentUser = req.params.studentId;
      var studentId = currentUser._id;
      var enrollment = {
          student: studentId,
          section: sectionId
      };

      sectionModel
          .decrementSectionSeats(sectionId)
          .then(function () {
              return enrollmentModel
                  .enrollStudentInSection(enrollment)
          })
          .then(function (enrollment) {
              res.json(enrollment);
          })
  }

  function findSectionsForCourse(req, res) {
    var courseId = req.params['courseId'];
    sectionModel
      .findSectionsForCourse(courseId)
      .then(function (sections) {
        res.json(sections);
      })
  }

  function createSection(req, res) {
    var section = req.body;
    sectionModel
      .createSection(section)
      .then(function (section) {
        res.json(section);
      })
  }

  function findSectionById(req, res) {
    var sectionId = req.params['sectionId'];
    sectionModel.findSectionById(sectionId)
        .then(function (section) {
          res.json(section);
        });
  }

  function updateSectionById(req, res) {
    var sectionId = req.params['sectionId'];
    var section = req.body;
    sectionModel.updateSectionById(section, sectionId)
        .then(function (section) {
          res.json(section);
        });
  }

  function deleteSectionById(req, res) {
    var sectionId = req.params['sectionId'];
    sectionModel.deleteSectionById(sectionId)
        .then(function (section) {
          res.json(section);
        });
  }

  function findSectionsByStudentId(req, res) {
    var studentId = req.params['studentId'];
    enrollmentModel
          .findEnrolledSectionsByStudentId(studentId)
          .then(function(enrollments) {
              res.json(enrollments);
          });
  }

  function unenrollStudent(req, res) {
    var studentId = req.params['studentId'];
    var sectionId = req.params['sectionId'];
    enrollmentModel
        .unenrollStudent(studentId, sectionId)
        .then(function (enrollment) {
          res.json(enrollment);
        });

  }
};