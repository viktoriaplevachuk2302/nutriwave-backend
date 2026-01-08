const express = require('express');
const { getProfile, createOrUpdateProfile } = require('../controllers/user.controller.js');
const { requireAuth } = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get('/me', requireAuth, getProfile);
router.post('/me', requireAuth, createOrUpdateProfile);

module.exports = router;