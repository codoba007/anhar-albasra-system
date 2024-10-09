const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect( process.env.MONGO_SERVER, {
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // إيقاف التطبيق في حال فشل الاتصال
  }
};

module.exports = connectDB;
