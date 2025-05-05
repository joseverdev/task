const express = require('express');
const passport = require('passport');

const {sTask} = require('../services/sTask.js');

const router = express.Router();

router.get('/my-tasks',
  passport.authenticate('jwt', { session: false }),
  async(req, res, next) => {
    try {
      const user = req.user;
      console.log(user);
      const tasks =await sTask.findAllByUser(user.sub);
      res.json(tasks);

    } catch (error) {
      next(error);

    }
  }
);

module.exports = router;