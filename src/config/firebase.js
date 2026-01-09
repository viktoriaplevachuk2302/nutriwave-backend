const admin = require("firebase-admin");

// Явна ініціалізація з projectId — працює на Fly.io, Render, Vercel тощо
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "nutriwave-60a92", // твій project_id з Firebase
  });
}

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

module.exports = { admin, db };