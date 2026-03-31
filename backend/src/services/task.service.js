const taskRepository = require('../repositories/task.repository');
const statsRepository = require('../repositories/stats.repository');

const EXP_MAP = { low: 10, medium: 20, high: 30 };

class TaskService {
  async getAllTasks() {
    const tasks = await taskRepository.findAll();
    // Return in source1-compatible format
    return tasks.map(this._format);
  }

  async createTask(text, priority = 'medium') {
    const task = await taskRepository.create({ text, priority, status: 'todo', createdAt: Date.now() });
    return this._format(task);
  }

  async updateStatus(id, status) {
    const task = await taskRepository.findById(id);
    if (!task) throw { status: 404, message: 'Task not found' };

    const updateData = { status };
    const wasNotDone = task.status !== 'done';
    const isNowDone = status === 'done';
    const wasNowUndone = task.status === 'done' && status !== 'done';

    if (isNowDone) {
      updateData.completedAt = Date.now();
    } else {
      updateData.completedAt = null;
    }

    const updated = await taskRepository.update(id, updateData);

    // Update stats
    let stats = await statsRepository.getOrCreate();
    const expGain = EXP_MAP[task.priority] || 20;

    if (isNowDone && wasNotDone) {
      // Gain EXP + update streak
      const newExp = stats.exp + expGain;
      const today = new Date().toDateString();
      let newStreak = stats.streak;
      if (stats.lastCompletedDate !== today) {
        newStreak = stats.streak + 1;
      }
      stats = await statsRepository.update({
        exp: newExp,
        level: Math.floor(newExp / 100) + 1,
        streak: newStreak,
        lastCompletedDate: today,
      });
    } else if (wasNowUndone) {
      // Lose EXP
      const newExp = Math.max(0, stats.exp - expGain);
      stats = await statsRepository.update({
        exp: newExp,
        level: Math.floor(newExp / 100) + 1,
      });
    }

    return {
      todo: this._format(updated),
      stats: { exp: stats.exp, level: stats.level, streak: stats.streak },
    };
  }

  async addFocusExp(amount) {
    let stats = await statsRepository.getOrCreate();
    const newExp = stats.exp + amount;
    stats = await statsRepository.update({
      exp: newExp,
      level: Math.floor(newExp / 100) + 1,
    });
    return { exp: stats.exp, level: stats.level, streak: stats.streak };
  }

  async deleteTask(id) {
    const task = await taskRepository.findById(id);
    if (!task) throw { status: 404, message: 'Task not found' };
    return taskRepository.delete(id);
  }

  _format(task) {
    return {
      id: task._id.toString(),
      text: task.text,
      priority: task.priority,
      status: task.status,
      createdAt: task.createdAt,
      completedAt: task.completedAt,
    };
  }
}

module.exports = new TaskService();
