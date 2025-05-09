'use strict';

const { USER_TABLE, UserSchema } = require('../db/models/mUser');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE,UserSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE)
  }
};
