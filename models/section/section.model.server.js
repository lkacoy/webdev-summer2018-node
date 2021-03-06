var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
  return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
  return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
  return sectionModel.update({
    _id: sectionId
  }, {
    $inc: {seats: -1}
  });
}

function incrementSectionSeats(sectionId) {
  return sectionModel.update({
    _id: sectionId
  }, {
    $inc: {seats: +1}
  });
}

function findSectionById(sectionId) {
  return sectionModel.findById(sectionId);
}

function updateSectionById(section, sectionId) {
    var query = {"_id": sectionId};
    return sectionModel.findOneAndUpdate(query, section);
}

function deleteSectionById(sectionId) {
  return sectionModel.deleteOne({ _id: sectionId });
}

module.exports = {
  createSection: createSection,
  findSectionsForCourse: findSectionsForCourse,
  decrementSectionSeats: decrementSectionSeats,
  incrementSectionSeats: incrementSectionSeats,
  findSectionById: findSectionById,
  updateSectionById: updateSectionById,
  deleteSectionById: deleteSectionById
};