const Task = require('../models/task.model');

class TaskRepository {
  async findAll() {
    return Task.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return Task.findById(id);
  }

  async create(data) {
    return Task.create(data);
  }

  async update(id, data) {
    return Task.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return Task.findByIdAndDelete(id);
  }
}

module.exports = new TaskRepository();
