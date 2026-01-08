const express = require('express');
const { addMeal, getDailyDiary, deleteMeal, addWaterGlass } = require('../controllers/diary.controller.js');
const { requireAuth } = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/meal', requireAuth, addMeal);
router.get('/', requireAuth, getDailyDiary);
router.delete('/meal', requireAuth, deleteMeal);
router.post('/water', requireAuth, addWaterGlass);  // ← новий роут для води

module.exports = router;