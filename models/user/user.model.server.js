var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials); //{username: 1}
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByName(username) {
  return userModel.findOne({username: username });
}

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}

function updateUser(username, user) {
    console.log(user);
  var query = {'username': username};
  return userModel.findOneAndUpdate(query, user, {new: true})
}

function deleteUser(user) {
  var query = {'username': user.username};
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  findUserByCredentials: findUserByCredentials,
  findUserByName: findUserByName,
  updateUser: updateUser,
  deleteUser: deleteUser
};

module.exports = api;