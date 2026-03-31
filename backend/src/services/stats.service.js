const statsRepository = require('../repositories/stats.repository');

class StatsService {
  async getStats() {
    const stats = await statsRepository.getOrCreate();
    return { exp: stats.exp, level: stats.level, streak: stats.streak };
  }
}

module.exports = new StatsService();
