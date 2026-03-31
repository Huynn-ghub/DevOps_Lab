const express = require('express');
const router = express.Router();
const todosRoutes = require('./todos.routes');
const statsRoutes = require('./stats.routes');

router.use('/todos', todosRoutes);
router.use('/stats', statsRoutes);

module.exports = router;
