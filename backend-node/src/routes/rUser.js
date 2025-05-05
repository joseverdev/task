const express = require('express');
const passport = require('passport');


const { sUser } = require('../services/sUser');
const { createUserSchema } = require('../../schemas/user.schema');
const validatorHandler = require('../../middlewares/validator.handler');

const rUser = express.Router();

rUser.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const users = await sUser.users();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

rUser.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const newUser = await sUser.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  });

/* rUser.post('/login',
  // validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      // console.log('LOGINNNNN')
      // console.log('Req.body', req.body)
      const user = await sUser.login(req.body);
      // console.log('User', user)
      res.status(201).json({ user: user, res: 'ok' });

    } catch (error) {
      next(error);
    }
  }
);
 */
module.exports = rUser;