const express = require('express');

const tagController = require('../controllers/tagController');

const tagRouter = express.Router();

tagRouter.get('/all', tagController.getTags, (req, res) =>
  res.status(200).send(res.locals.result),
);

tagRouter.get('/one/:id', tagController.getTag, (req, res) =>
  res.status(200).send(res.locals.result),
);

tagRouter.post('/one', tagController.postTag, (req, res) =>
  res.status(201).send(res.locals.result),
);

tagRouter.put('/one/:id', tagController.putTag, (req, res) =>
  res.status(200).send(res.locals.result),
);

tagRouter.delete('/one/:id', tagController.deleteTag, (req, res) =>
  res.status(200).send(res.locals.result),
);

module.exports = tagRouter;
