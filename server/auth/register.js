const User = require('../db/userSchema');
const Session = require('../db/sessionSchema');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  try {
    if (
      !req.body ||
      !req.body.username ||
      !req.body.password ||
      !req.body.email
    ) {
      return next({
        success: false,
        statusCode: 400,
        message: `The email, username, and password fields are required.`,
      });
    }

    const { username, password, email } = req.body;
    if (process.env.NODE_ENV === 'production') {
      if (password.length < 8) {
        return next({
          statusCode: 400,
          message: `The password must be at least 8 characters long.`,
        });
      }

      if (password.length > 64) {
        return next({
          statusCode: 400,
          message: `The password cannot be more than 64 characters long.`,
        });
      }
    }

    const existingEmails = await User.find({ email });
    if (existingEmails.length) {
      return next({
        success: false,
        statusCode: 409,
        message: `An account with this email already exists.`,
      });
    }

    const existingUsernames = await User.find({ username });
    if (existingUsernames.length) {
      return next({
        success: false,
        statusCode: 409,
        message: `An account with this username already exists.`,
      });
    }

    const user = await User.create({ email, username, password });
    if (!user) {
      return next({
        success: false,
        message: 'There was an error. Please try again later.',
      });
    }
    const { _id } = user;

    const payload = { _id };
    const secret = process.env.APP_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    if (process.env.NODE_ENV === 'production') {
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
    } else {
      res.cookie('token', token, { httpOnly: true });
    }

    // start a session
    const session = await Session.create({ _id, token });
    if (!session) {
      // if we can't start a session, destroy the created user to avoid issues
      await User.deleteOne({ _id });
      return next({
        success: false,
        message: 'Unable to start session. Please try again later.',
      });
    }

    // done
    res.locals.result = {
      success: true,
      _id,
    };
    return next();
  } catch (err) {
    return next({ success: false, statusCode: 400, message: err.message });
  }
};

module.exports = register;
