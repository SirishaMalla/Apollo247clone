const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
require('dotenv').config();
console.log("Mongo URI:", process.env.MONGO_URI);


const doctors = [
  {
    name: "Dr. SirishaShyamsundar",
    specialty: "Gynaecologist",
    rating: 5.0,
    reviews: 120,
    fees: 500,
    availability: "Today",
    gender: "female",
    experience: 7,
    image: "https://i.ibb.co/ZYW3VTp/brown-brim.png"
  },
  {
    name: "Dr. Akhil",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 110,
    fees: 500,
    availability: "Tomorrow",
    gender: "male",
    experience: 6,
    image: "https://i.ibb.co/ZYW3VTp/brown-brim.png"
  },
  {
    name: "Dr. RishiSaroja Ayinada",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 100,
    fees: 500,
    availability: "Today",
    gender: "female",
    experience: 8,
    image: "https://i.ibb.co/ZYW3VTp/brown-brim.png"
  },
  {
    name: "Dr. Vijay Angara",
    specialty: "Neurologist",
    rating: 4.7,
    reviews: 90,
    fees: 500,
    availability: "Tomorrow",
    gender: "male",
    experience: 10,
    image: "https://i.ibb.co/ZYW3VTp/brown-brim.png"
  },
  {
    name: "Dr. Aarti Sharma",
    specialty: "Veterinary",
    rating: 4.5,
    reviews: 120,
    fees: 500,
    availability: "Today",
    gender: "female",
    experience: 5,
    image: "https://i.ibb.co/ZYW3VTp/brown-brim.png"
  },
  {
    name: "Dr. Rakesh Mehta",
    specialty: "Psychiatrist",
    rating: 4.7,
    reviews: 98,
    fees: 600,
    availability: "Tomorrow",
    gender: "male",
    experience: 9,
    image: "https://i.ibb.co/ZYW3VTp/brown-brim.png"
  },
  {
    name: "Dr. Sneha Rao",
    specialty: "Pediatrician",
    rating: 4.8,
    reviews: 150,
    fees: 700,
    availability: "Slots filling fast",
    gender: "female",
    experience: 10,
    image: "https://i.ibb.co/ZYW3VTp/brown-brim.png"
  },
  {
    name: "Dr. Mahesh Iyer",
    specialty: "General Physician",
    rating: 4.6,
    reviews: 85,
    fees: 400,
    availability: "Today",
    gender: "male",
    experience: 4,
    image: "https://i.ibb.co/ZYW3VTp/brown-brim.png"
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  await Doctor.deleteMany({});
  await Doctor.insertMany(doctors);
  console.log("✅ All doctors inserted successfully!");
  mongoose.disconnect();
})
.catch(err => console.error("MongoDB Error:", err));
