const Food = require('../db/foodSchema');

const foodController = {};

foodController.getFoods = async (req, res, next) => {
  try {
    console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
    const foods = await Food.find();
    res.locals.result = {
      success: true,
      data: foods,
    };
    console.log(`Retrieved foods: ${JSON.stringify(foods)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

foodController.getFood = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    if (!food) {
      throw new Error(`food id ${id} does not exist.`);
    }
    res.locals.result = {
      success: true,
      data: food,
    };
    console.log(`Retrieved food: ${JSON.stringify(food)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

foodController.postFood = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    const food = await Food.create(req.body);
    res.locals.result = {
      success: true,
      data: food,
      name: 'foods',
    };
    console.log(`Created food: ${JSON.stringify(food)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

foodController.putFood = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndUpdate(id, req.body);
    if (!food) {
      throw new Error(`food id ${id} does not exist.`);
    }
    res.locals.result = {
      success: true,
      data: food,
      name: 'foods',
    };
    console.log(`Updated food: ${JSON.stringify(food)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

foodController.deleteFood = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      throw new Error(`food id ${id} does not exist.`);
    }
    res.locals.result = {
      success: true,
      data: food,
      name: 'foods',
    };
    console.log(`Deleted food: ${JSON.stringify(food)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = foodController;
