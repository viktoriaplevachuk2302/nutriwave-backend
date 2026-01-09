const admin = require("firebase-admin");

// Автоматична ініціалізація — працює на Fly.io, Render, Vercel тощо
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

module.exports = { admin, db };
