const admin = require("firebase-admin");

// Автоматична ініціалізація — працює на Render, Vercel, Railway тощо
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Додаткова настройка (опціонально)
db.settings({ ignoreUndefinedProperties: true });

module.exports = { admin, db };