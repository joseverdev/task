const express = require('express');
const { sTask } = require('../services/sTask');
const { createTaskSchema, updateTaskSchema, getTaskSchema } = require('../../schemas/task.schema');
const validatorHandler = require('../../middlewares/validator.handler');
const passport = require('passport');

const rTask = express.Router();

rTask.get('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const tasks = await sTask.findAllByUser(req.params.id);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
);

rTask.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      console.log('POST TASK req.body:', req.body);
      const body = req.body;
      const task = await sTask.create(body);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

rTask.put('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getTaskSchema, 'params'),
  validatorHandler(updateTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const task = await sTask.update(id, body);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

rTask.patch('/:id/complete',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getTaskSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await sTask.complete(id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);


rTask.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const task = await sTask.delete(id);
      res.json(task);
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ message: 'Internal server error', error });

    }
  }
)



module.exports = rTask;
