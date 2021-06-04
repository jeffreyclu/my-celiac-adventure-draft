const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'sessions',
  new Schema({
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, expires: 6000, default: Date.now },
  }),
);
