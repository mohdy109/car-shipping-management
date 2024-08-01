const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const carRoutes = require('./routes/carRoutes');
const authRoutes = require('./routes/authRoutes')

require('dotenv').config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
