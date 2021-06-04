const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

require('colors');
require('dotenv').config();

// db
require('./db/index');

// Setup
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());

// Authentication
const isAuthorized = require('./auth/auth');
app.get('/api/auth', isAuthorized, (req, res) => {
  res.status(200).json(res.locals.result);
});
const isAdminAuthorized = require('./auth/auth-admin');
app.get('/api/auth-admin', isAuthorized, isAdminAuthorized, (req, res) => {
  res.status(200).json(res.locals.result);
});
const login = require('./auth/login');
app.post('/api/login', login, (req, res) => {
  res.status(200).json(res.locals.result);
});
const logout = require('./auth/logout');
app.post('/api/logout', logout, (req, res) => {
  res.status(200).json(res.locals.result);
});
const register = require('./auth/register');
app.post('/api/register', register, (req, res) => {
  res.status(201).json(res.locals.result);
});

// Routes
const foodRouter = require('./routes/food');
app.use('/api/food', foodRouter);
const tagRouter = require('./routes/tag');
app.use('/api/tag', tagRouter);
const cacheRouter = require('./routes/cache');
app.use('/api/cache', cacheRouter);

// Serve index.html
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, '../client/public')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Error stack -> ${JSON.stringify(err, null, 2)}`.red);
  }
  return res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});

// Run the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold,
  );
});
