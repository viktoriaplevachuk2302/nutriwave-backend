const { db } = require('../config/firebase.js');

const getProfile = async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

const createOrUpdateProfile = async (req, res) => {
  try {
    const { name, age, weight, height, gender, goal, activityLevel } = req.body;

    const userRef = db.collection('users').doc(req.user.uid);
    const data = {
      name: name || '',
      age: age || 0,
      currentWeight: weight || 0,
      height: height || 0,
      gender: gender || 'other',
      goal: goal || 'maintain', // lose, gain, maintain
      activityLevel: activityLevel || 'sedentary',
      updatedAt: new Date()
    };

    await userRef.set(data, { merge: true });
    res.json({ message: 'Profile updated', data });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProfile, createOrUpdateProfile };