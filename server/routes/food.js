const express = require('express');

const foodController = require('../controllers/foodController');
const cacheController = require('../controllers/cacheController');

const foodRouter = express.Router();
foodRouter.get('/all', foodController.getFoods, (req, res) =>
  res.status(200).send(res.locals.result),
);

foodRouter.get('/one/:id', foodController.getFood, (req, res) =>
  res.status(200).send(res.locals.result),
);

foodRouter.post(
  '/one',
  foodController.postFood,
  cacheController.putCache,
  (req, res) => res.status(201).send(res.locals.result),
);

foodRouter.put(
  '/one/:id',
  foodController.putFood,
  cacheController.putCache,
  (req, res) => res.status(200).send(res.locals.result),
);

foodRouter.delete(
  '/one/:id',
  foodController.deleteFood,
  cacheController.putCache,
  (req, res) => res.status(200).send(res.locals.result),
);

module.exports = foodRouter;
