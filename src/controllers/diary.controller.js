const { db, admin } = require('../config/firebase.js');

// Додавання страви
const addMeal = async (req, res) => {
  const { mealType, foodName, calories, protein, carbs, fat, date } = req.body;

  if (!mealType || !foodName || calories == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const dateKey = date || new Date().toISOString().split('T')[0];
    const dayRef = db.collection('users').doc(req.user.uid)
      .collection('diary').doc(dateKey);

    const mealData = {
      foodName,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      addedAt: new Date()
    };

    await dayRef.set({
      [mealType]: admin.firestore.FieldValue.arrayUnion(mealData),
      totalCalories: admin.firestore.FieldValue.increment(Number(calories)),
      totalProtein: admin.firestore.FieldValue.increment(Number(protein) || 0),
      totalCarbs: admin.firestore.FieldValue.increment(Number(carbs) || 0),
      totalFat: admin.firestore.FieldValue.increment(Number(fat) || 0),
    }, { merge: true });

    res.json({ message: "Meal added successfully" });
  } catch (error) {
    console.error("Add meal error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Отримання щоденника за день
const getDailyDiary = async (req, res) => {
  const { date } = req.query;
  const dateKey = date || new Date().toISOString().split('T')[0];

  try {
    const doc = await db.collection('users').doc(req.user.uid)
      .collection('diary').doc(dateKey)
      .get();

    if (!doc.exists) {
      return res.json({
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        waterGlasses: 0,
        waterLiters: 0,
        meals: {
          breakfast: [],
          lunch: [],
          dinner: [],
          snack: []
        }
      });
    }

    const data = doc.data();
    res.json({
      totalCalories: data.totalCalories || 0,
      totalProtein: data.totalProtein || 0,
      totalCarbs: data.totalCarbs || 0,
      totalFat: data.totalFat || 0,
      waterGlasses: data.waterGlasses || 0,
      waterLiters: data.waterLiters || 0,
      meals: {
        breakfast: data.breakfast || [],
        lunch: data.lunch || [],
        dinner: data.dinner || [],
        snack: data.snack || []
      }
    });
  } catch (error) {
    console.error("Get diary error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Видалення страви за індексом у масиві
const deleteMeal = async (req, res) => {
  const { mealType, index } = req.body;

  if (!mealType || index == null) {
    return res.status(400).json({ error: "mealType and index are required" });
  }

  try {
    const dateKey = new Date().toISOString().split('T')[0];
    const dayRef = db.collection('users').doc(req.user.uid)
      .collection('diary').doc(dateKey);

    const doc = await dayRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Day not found" });
    }

    const data = doc.data();
    const meals = data[mealType] || [];

    if (index < 0 || index >= meals.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    const removedMeal = meals[index];

    const updatedMeals = meals.filter((_, i) => i !== index);

    await dayRef.update({
      [mealType]: updatedMeals,
      totalCalories: admin.firestore.FieldValue.increment(-removedMeal.calories),
      totalProtein: admin.firestore.FieldValue.increment(-(removedMeal.protein || 0)),
      totalCarbs: admin.firestore.FieldValue.increment(-(removedMeal.carbs || 0)),
      totalFat: admin.firestore.FieldValue.increment(-(removedMeal.fat || 0)),
    });

    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Delete meal error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Додавання склянки води
const addWaterGlass = async (req, res) => {
  try {
    const dateKey = new Date().toISOString().split('T')[0];
    const dayRef = db.collection('users').doc(req.user.uid)
      .collection('diary').doc(dateKey);

    await dayRef.set({
      waterGlasses: admin.firestore.FieldValue.increment(1),
      waterLiters: admin.firestore.FieldValue.increment(0.25), // 250 мл на склянку
    }, { merge: true });

    res.json({ message: "Воду додано" });
  } catch (error) {
    console.error("Add water error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addMeal, getDailyDiary, deleteMeal, addWaterGlass };