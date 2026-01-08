const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.routes.js');
const weightRoutes = require('./routes/weight.routes.js');
const diaryRoutes = require('./routes/diary.routes.js');
const recipesRoutes = require('./routes/recipes.routes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'OK', message: 'NutriWave backend is running!', date: new Date() }));

app.use('/api/users', userRoutes);
app.use('/api/weight', weightRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/recipes', recipesRoutes);

module.exports = app;