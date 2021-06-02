const Tag = require('../db/tagSchema');

const tagController = {};

tagController.getTags = async (req, res, next) => {
  try {
    console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
    const tags = await Tag.find();
    res.locals.result = {
      success: true,
      data: tags,
    };
    console.log(`Retrieved tags: ${JSON.stringify(tags)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

tagController.getTag = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    if (!tag) {
      throw new Error(`tag id ${id} does not exist.`);
    }
    res.locals.result = {
      success: true,
      data: tag,
    };
    console.log(`Retrieved tag: ${JSON.stringify(tag)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

tagController.postTag = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    const tag = await Tag.create(req.body);
    res.locals.result = {
      success: true,
      data: tag,
    };
    console.log(`Created tag: ${JSON.stringify(tag)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

tagController.putTag = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndUpdate(id, req.body);
    if (!tag) {
      throw new Error(`tag id ${id} does not exist.`);
    }
    res.locals.result = {
      success: true,
      data: tag,
    };
    console.log(`Updated tag: ${JSON.stringify(tag)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

tagController.deleteTag = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndDelete(id);
    if (!tag) {
      throw new Error(`tag id ${id} does not exist.`);
    }
    res.locals.result = {
      success: true,
      data: tag,
    };
    console.log(`Deleted tag: ${JSON.stringify(tag)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = tagController;
