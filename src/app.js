const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.routes.js');
const weightRoutes = require('./routes/weight.routes.js');
const diaryRoutes = require('./routes/diary.routes.js');
const recipesRoutes = require('./routes/recipes.routes.js');

const app = express();

// Дозволяємо CORS з фронтенду (Vercel + localhost для розробки)
app.use(cors({
  origin: [
    'https://nutriwave-frontend.vercel.app',
    'http://localhost:5173', // для локальної розробки
    'http://localhost:3000'  // якщо використовуєш інший порт
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Обробка всіх OPTIONS-запитів (preflight)
app.options('*', cors());

// Парсинг JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (дуже важливо для Vercel — перевіряє, чи сервер живий)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'NutriWave backend is running!', 
    date: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Твої роути
app.use('/api/users', userRoutes);
app.use('/api/weight', weightRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/recipes', recipesRoutes);

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Обробка помилок (щоб Vercel не падав)
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;