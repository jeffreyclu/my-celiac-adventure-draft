const express = require('express');

const tagController = require('../controllers/tagController');
const cacheController = require('../controllers/cacheController');

const tagRouter = express.Router();

tagRouter.get('/all', tagController.getTags, (req, res) =>
  res.status(200).send(res.locals.result),
);

tagRouter.get('/one/:id', tagController.getTag, (req, res) =>
  res.status(200).send(res.locals.result),
);

tagRouter.post(
  '/one',
  tagController.postTag,
  cacheController.putCache,
  (req, res) => res.status(201).send(res.locals.result),
);

tagRouter.put(
  '/one/:id',
  tagController.putTag,
  cacheController.putCache,
  (req, res) => res.status(200).send(res.locals.result),
);

tagRouter.delete(
  '/one/:id',
  tagController.deleteTag,
  cacheController.putCache,
  (req, res) => res.status(200).send(res.locals.result),
);

module.exports = tagRouter;
