const taskService = require('../services/task.service');

class TaskController {
  // GET /api/todos
  async getAll(req, res, next) {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  // POST /api/todos
  async create(req, res, next) {
    try {
      const { text, priority } = req.body;
      const task = await taskService.createTask(text, priority);
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  }

  // PATCH /api/todos/:id  { status }
  async updateStatus(req, res, next) {
    try {
      const result = await taskService.updateStatus(req.params.id, req.body.status);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/todos/:id
  async remove(req, res, next) {
    try {
      await taskService.deleteTask(req.params.id);
      res.json({ success: true, message: 'Task deleted' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TaskController();
