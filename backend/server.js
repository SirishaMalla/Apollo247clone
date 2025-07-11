const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const doctorRoutes = require('./routes/doctorRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error(" MongoDB connection error:", err));

// Routes
app.use('/api/doctors', doctorRoutes); // ✅ IMPORTANT

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Welcome to Apollo247 Backend API");
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
app.get('/test', (req, res) => {
  res.send(" Test route working");
});


