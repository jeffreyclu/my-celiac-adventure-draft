const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'tags',
  new Schema({
    tag: {
      type: String,
      required: true,
    },
  }),
);
