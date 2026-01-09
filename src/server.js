require('dotenv').config();
const app = require('./app.js');

// Fly.io призначає порт через process.env.PORT, fallback не потрібен
const PORT = process.env.PORT;

if (!PORT) {
  console.error("Error: PORT is not defined. Fly.io must set process.env.PORT");
  process.exit(1);
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 NutriWave backend running on http://0.0.0.0:${PORT}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`Public URL: https://nutriwave-backend.fly.dev`);
});
