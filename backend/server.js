const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./Route/UserRoute');
const db = require('./config/db');

const app = express();

// Middleware
app.use(cors({
    origin:["https://attedance-management-frontend.vercel.app/"],
    methods:["POST","GET"],
    Credentials:true
}));
app.use(bodyParser.json());
app.use(express.json());

// Log requests
app.use((req, res, next) => {
    console.log(`Path: ${req.path}, Method: ${req.method}`);
    next();
});

// Routes
app.use('/auth', authRoutes);  // Use the auth routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
