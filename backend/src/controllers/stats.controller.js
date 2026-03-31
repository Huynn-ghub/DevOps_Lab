const statsService = require('../services/stats.service');
const taskService = require('../services/task.service');

class StatsController {
  // GET /api/stats
  async getStats(req, res, next) {
    try {
      const stats = await statsService.getStats();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }

  // POST /api/stats/exp  { amount }
  async addExp(req, res, next) {
    try {
      const { amount } = req.body;
      const stats = await taskService.addFocusExp(amount || 15);
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new StatsController();
