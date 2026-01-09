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
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

const createOrUpdateProfile = async (req, res) => {
  try {
    const { name, age, weight, height, gender, goal, activityLevel, selectedProgram } = req.body;

    // Валідація та приведення типів
    const data = {
      name: name?.trim() || '',
      age: age ? parseInt(age, 10) : 0,
      currentWeight: weight ? parseFloat(weight) : 0,
      height: height ? parseInt(height, 10) : 0,
      gender: gender || 'other',
      goal: goal || 'maintain', 
      activityLevel: activityLevel || 'sedentary',
      selectedProgram: selectedProgram || null, 
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const userRef = db.collection('users').doc(req.user.uid);

    await userRef.set(data, { merge: true });

    const updatedDoc = await userRef.get();
    res.status(200).json({
      message: 'Profile updated successfully',
      data: { id: updatedDoc.id, ...updatedDoc.data() },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

module.exports = { getProfile, createOrUpdateProfile };