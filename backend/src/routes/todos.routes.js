const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// GET /api/todos
router.get('/', taskController.getAll.bind(taskController));

// POST /api/todos
router.post('/', taskController.create.bind(taskController));

// PATCH /api/todos/:id
router.patch('/:id', taskController.updateStatus.bind(taskController));

// DELETE /api/todos/:id
router.delete('/:id', taskController.remove.bind(taskController));

module.exports = router;
