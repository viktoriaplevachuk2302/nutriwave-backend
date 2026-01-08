const { db } = require('../config/firebase.js');

const addWeight = async (req, res) => {
  const { weight, date } = req.body; // date в форматі 'YYYY-MM-DD'

  try {
    const dateKey = date || new Date().toISOString().split('T')[0];
    const weightRef = db.collection('users').doc(req.user.uid)
      .collection('weights').doc(dateKey);

    await weightRef.set({
      weight,
      date: dateKey
    });

    res.json({ message: 'Weight added' });
  } catch (error) {
    console.error('Add weight error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getWeightHistory = async (req, res) => {
  try {
    const snapshot = await db.collection('users').doc(req.user.uid)
      .collection('weights')
      .orderBy('date', 'desc')
      .get();

    const history = snapshot.docs.map(doc => doc.data());
    res.json(history);
  } catch (error) {
    console.error('Get weight history error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addWeight, getWeightHistory };