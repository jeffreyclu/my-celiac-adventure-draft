const mongoose = require('mongoose');
require('./index');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'foods', 
  new Schema({
    name: { type: String, required: true, lowercase: true, default: 'Sample Food'},
    description: { type: String, required: true, lowercase: true, default: 'Sample Description'},
    gluten: { type: Boolean, required: true, default: false },
    fructose: { type: Boolean, required: true, default: false },
    lactose: { type: Boolean, required: true, default: false },
    glutenExplanation: { type: String, required: false },
    fructoseExplanation: { type: String, required: false },
    lactoseExplanation: { type: String, required: false },
    price: { type: Number, required: true, default: 1 },
    baseHunger: { type: Number, required: true, default: 1 },
    baseHealth: { type: Number, required: true, default: 1 }
  })
);