const express = require('express');
const { getRecipes } = require('../controllers/recipes.controller.js');

const router = express.Router();

router.get('/', getRecipes);

module.exports = router;