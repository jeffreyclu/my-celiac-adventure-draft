const Session = require('../db/sessionSchema');

const logout = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    if (!req.body || !req.body._id) {
      return next({
        success: false,
        message: 'User id missing.',
      });
    }
    const { _id } = req.body;

    if (process.env.NODE_ENV === 'production') {
      res.cookie('token', null, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.clearCookie('token', { path: '/' });
    } else {
      res.cookie('token', null, { httpOnly: true });
      res.clearCookie('token', { path: '/' });
    }
    const session = await Session.deleteOne({ _id });
    console.log(session);
    if (!session.deletedCount) {
      return next({
        success: false,
        message: 'Session does not exist.',
      });
    }
    res.locals.result = { success: true, loggedOut: true };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = logout;
