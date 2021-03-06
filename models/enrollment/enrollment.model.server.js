var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema,
    'enrollment'
);

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function findSectionsForStudent(studentId) {
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

function findEnrolledSectionsByStudentId(studentId) {
  return enrollmentModel.find({student: studentId});
}

function unenrollStudent(studentId, sectionId) {
  return enrollmentModel.deleteOne({student: studentId, section: sectionId});
}

module.exports = {
  enrollStudentInSection: enrollStudentInSection,
  findSectionsForStudent: findSectionsForStudent,
  findEnrolledSectionsByStudentId: findEnrolledSectionsByStudentId,
  unenrollStudent: unenrollStudent
};