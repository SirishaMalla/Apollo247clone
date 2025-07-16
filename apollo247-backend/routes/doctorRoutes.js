const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// GET all doctors with optional filters
router.get("/", async (req, res) => {
  try {
    const { gender, experience, search, page = 1, limit = 6 } = req.query;
    console.log("📥 Query Received:", req.query);

    const filter = {};

    if (gender) {
      console.log("🔍 Filtering by gender:", gender);
      filter.gender = gender.toLowerCase(); // match lowercase
    }

    if (experience) {
      const expNum = parseInt(experience);
      if (!isNaN(expNum)) {
        console.log("🔍 Filtering by experience >=", expNum);
        filter.experience = { $gte: expNum };
      }
    }

    if (search) {
      console.log("🔍 Filtering by search:", search);
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { speciality: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;
    const total = await Doctor.countDocuments(filter);
    const doctors = await Doctor.find(filter).skip(skip).limit(parseInt(limit));

    console.log("✅ Doctors fetched:", doctors.length);

    res.json({
      doctors,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });

  } catch (error) {
    console.error("❌ Route crashed with error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
