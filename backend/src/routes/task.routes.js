const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const {
  createTaskValidator,
  updateTaskValidator,
  validate,
} = require('../validators/task.validator');

// GET /api/tasks
router.get('/', taskController.getAll.bind(taskController));

// POST /api/tasks
router.post(
  '/',
  createTaskValidator,
  validate,
  taskController.create.bind(taskController)
);

// PUT /api/tasks/:id/toggle
router.put('/:id/toggle', taskController.toggle.bind(taskController));

// PUT /api/tasks/:id
router.put(
  '/:id',
  updateTaskValidator,
  validate,
  taskController.update.bind(taskController)
);

// DELETE /api/tasks/:id
router.delete('/:id', taskController.remove.bind(taskController));

module.exports = router;
