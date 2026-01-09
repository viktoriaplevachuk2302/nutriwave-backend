require('dotenv').config();
const app = require('./app.js');

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 NutriWave backend running on http://0.0.0.0:${PORT}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`Public URL: https://nutriwave-backend.fly.dev`);
});
