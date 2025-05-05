const { Router } = require('express');
const rTask = require('./rTask.js');
const rUser = require('./rUser.js');
const rAuth = require('./rAuth.js');
const rProfile = require('./rProfile.js');

module.exports = function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/tasks', rTask);
  router.use('/users', rUser);
  router.use('/auth', rAuth);
  router.use('/profile', rProfile);
};
