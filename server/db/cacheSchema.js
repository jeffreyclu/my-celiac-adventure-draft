const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'caches',
  new Schema({
    name: { type: String, required: true },
    lastUpdated: { type: Date, required: true },
  }),
);
