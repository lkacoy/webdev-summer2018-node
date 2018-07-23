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

function updateUser(currentUser, newUser) {
    console.log(newUser);
    console.log(currentUser);
  var query = {'username': currentUser.username, "password": currentUser.password};
  return userModel.findOneAndUpdate(query, newUser)
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