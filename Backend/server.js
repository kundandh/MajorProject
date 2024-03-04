// app.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/dietplans", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Mongoose Schema
const nutritionPlanSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  // Add more fields as needed
});

const NutritionPlan = mongoose.model("Dietplan", nutritionPlanSchema);

app.use(bodyParser.json());
app.use(cors());

// Routes
app.post("/api/nutrition-plans", async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body; // Assuming you're sending imageUrl directly
    const nutritionPlan = new NutritionPlan({
      title,
      description,
      imageUrl,
    });
    const newNutritionPlan = await nutritionPlan.save();
    res.status(201).json(newNutritionPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET All Nutrition Plans
app.get("/api/nutrition-plans", async (req, res) => {
  try {
    const nutritionPlans = await NutritionPlan.find();
    res.json(nutritionPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Nutrition Plan by ID
app.get("/api/nutrition-plans/:id", async (req, res) => {
  try {
    const nutritionPlan = await NutritionPlan.findById(req.params.id);
    if (nutritionPlan == null) {
      return res.status(404).json({ message: "Nutrition plan not found" });
    }
    res.json(nutritionPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
