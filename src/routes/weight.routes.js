const express = require('express');
const { addWeight, getWeightHistory } = require('../controllers/weight.controller.js');
const { requireAuth } = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/', requireAuth, addWeight);
router.get('/', requireAuth, getWeightHistory);

module.exports = router;