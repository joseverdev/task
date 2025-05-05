'use strict';

const { TASK_TABLE, TaskSchema } = require('../db/models/mTask');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(TASK_TABLE, 'user_id', TaskSchema.userId);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(TASK_TABLE, 'user_id');
  }
};
