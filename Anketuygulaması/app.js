require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const responseRoutes = require('./routes/responseRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

const app = express();

// Veritabanına bağlan
connectDB();

// Middleware
app.use(express.json());

// Rotalar
app.use('/api', authRoutes);
app.use('/api', surveyRoutes);
app.use('/api', responseRoutes);

// Anasayfa rotası
app.get('/', (req, res) => {
    res.send('Welcome to the Survey API!');
});

// Sunucu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
