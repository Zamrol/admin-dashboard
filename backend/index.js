import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './data/database.js';

// Load Environment Variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Mengaktifkan CORS
app.use(express.json());

// Cek Koneksi Database
app.get('/check-db', async (req, res) => {
  try {
    await db.authenticate();
    res.status(200).json({ message: 'Database is connected successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to connect to the database.', error: error.message });
  }
});


// Contoh Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Dokter Ikan API!',
    app_port: process.env.APP_PORT,
    jwt_secret: process.env.JWT_SECRET ? 'Available' : 'Not set',
  });
});

// Menentukan Port dari Environment Variables
app.listen(process.env.APP_PORT, () => {
  console.log(`Server up and running on port ${process.env.APP_PORT}...`);
});
