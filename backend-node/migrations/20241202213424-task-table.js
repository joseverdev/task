'use strict';

const { TASK_TABLE, TaskSchema } = require('../db/models/mTask');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(TASK_TABLE, TaskSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(TASK_TABLE)
  }
};
