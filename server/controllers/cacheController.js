const Cache = require('../db/cacheSchema');

const cacheController = {};

cacheController.getCache = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    const { name } = req.params;
    const cache = await Cache.findOne({ name });
    if (!cache) {
      throw new Error(`cache name ${name} does not exist.`);
    }
    res.locals.result = {
      success: true,
      data: cache,
    };
    console.log(`Retrieved cache status: ${JSON.stringify(cache)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

cacheController.putCache = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    const { name } = res.locals.result;
    const cache = await Cache.updateOne({ name }, { lastUpdated: Date.now() });
    if (!cache) {
      throw new Error(`cache name ${name} does not exist.`);
    }
    res.locals.result.cache = cache;
    console.log(`Updated cache status: ${JSON.stringify(cache)}`.green);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = cacheController;
