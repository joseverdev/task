const boom = require('@hapi/boom');

const {models} = require('../../libs/sequelize.js');

const sTask = {
  create: async(data) => {
    console.log(data)
    const newTask = await models.Task.create(data);
    return {newTask};
  },
  findAllByUser: async(userId) => {
    console.log(userId)
    const tasks = await models.Task.findAll({
      where: { userId: userId },
    });
    return tasks;
  },
  update: async(id, data) => {
    const task = await models.Task.findByPk(id);
    if(!task){
      throw boom.notFound('Task not found');
    }

    task.description = data.description;
    await task.save();
    return task;
  },
  complete: async(id) => {
    const task = await models.Task.findByPk(id);
    if(!task){
      throw boom.notFound('Task not found');
    }
    task.done = !task.done;
    await task.save();
    return task;
  },
  delete: async(id) => {
    const task = await models.Task.findByPk(id);
    await task.destroy();
    return task;
  }
}

module.exports = { sTask };