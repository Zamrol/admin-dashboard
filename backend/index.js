import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import db from './config/Database.js';
import UserRoute from './routes/UserRoute.js';
import FishExpertRoute from './routes/FishExpertRoute.js';

// Load Environment Variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  credentials : true,
  origin : 'http://localhost:3000'
}
)); // Mengaktifkan CORS untuk mengizinkan domain frontend
app.use(express.json());

app.use(session({
  secret : process.env.SESS_SECRET,
  resave : false,
  saveUninitialized : true,
  cookie : {
    secure :'auto'
  }
}));

// Route
app.use (UserRoute);
app.use (FishExpertRoute);
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
