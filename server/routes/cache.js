const express = require('express');

const cacheController = require('../controllers/cacheController');

const cacheRouter = express.Router();

cacheRouter.get('/:name', cacheController.getCache, (req, res) =>
  res.status(200).send(res.locals.result),
);

module.exports = cacheRouter;
