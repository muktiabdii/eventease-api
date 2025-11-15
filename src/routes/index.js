const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');

router.get('/', (req, res) => {
  res.send('✅ EventEase API running');
});

router.use('/users', userRoutes);
router.use('/events', eventRoutes);

module.exports = router;
