const { Task, TaskSchema } = require("./mTask.js");
const { User, UserSchema } = require("./mUser.js");

function setupModels(sequelize) {
  Task.init(TaskSchema, Task.config(sequelize));
  User.init(UserSchema, User.config(sequelize));

  User.associate(sequelize.models);
  Task.associate(sequelize.models);
}

module.exports = { setupModels };