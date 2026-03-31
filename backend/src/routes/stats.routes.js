const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');

// GET /api/stats
router.get('/', statsController.getStats.bind(statsController));

// POST /api/stats/exp
router.post('/exp', statsController.addExp.bind(statsController));

module.exports = router;
