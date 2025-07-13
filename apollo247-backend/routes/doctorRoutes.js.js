const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router(); // ✅ Make sure this is added

// GET /api/doctors with filters, search and pagination
router.get('/', async (req, res) => {
  console.log("🔥 /api/doctors route hit");

  const { gender, experience, search, page = 1, limit = 6 } = req.query;

  let filter = {};

  if (gender) {
    filter.gender = gender;
  }

  if (experience) {
    if (experience === "0-5") {
      filter.experience = { $lte: 5 };
    } else if (experience === "5-10") {
      filter.experience = { $gte: 5, $lte: 10 };
    } else if (experience === "10+") {
      filter.experience = { $gte: 10 };
    }
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { specialty: { $regex: search, $options: "i" } }
    ];
  }

  try {
    const doctors = await Doctor.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCount = await Doctor.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({ doctors, totalPages });
  } catch (err) {
    console.error("❌ Backend Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

