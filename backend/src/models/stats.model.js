const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema(
  {
    exp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    lastCompletedDate: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Stats', statsSchema);
