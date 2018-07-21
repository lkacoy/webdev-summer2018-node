var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function findSectionsForStudent(studentId) {
  console.log("STUDENTID: " + studentId);
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

function unenrollStudent(studentId, sectionId) {
  return enrollmentModel.deleteOne({student: studentId, section: sectionId});
}

module.exports = {
  enrollStudentInSection: enrollStudentInSection,
  findSectionsForStudent: findSectionsForStudent,
  unenrollStudent: unenrollStudent
};