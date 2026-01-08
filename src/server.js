require('dotenv').config();
const app = require('./app.js');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 NutriWave backend running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});