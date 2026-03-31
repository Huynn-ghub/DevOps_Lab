const Stats = require('../models/stats.model');

class StatsRepository {
  async getOrCreate() {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = await Stats.create({});
    }
    return stats;
  }

  async update(data) {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = await Stats.create(data);
    } else {
      Object.assign(stats, data);
      await stats.save();
    }
    return stats;
  }
}

module.exports = new StatsRepository();
