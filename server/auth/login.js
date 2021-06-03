const User = require('../db/userSchema');
const Session = require('../db/sessionSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  const invalidate = () => {
    res.locals.loggedIn = { loggedIn: false };
    res.clearCookie('token', { path: '/' });
    return next({
      success: false,
      statusCode: 401,
      message: 'The email or password you entered is invalid.',
    });
  };

  try {
    // invalidate if req body is invalid
    if (!req.body || !req.body.username || !req.body.password) {
      invalidate();
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // invalidate if user not found
    if (!user) {
      invalidate();
    }

    const storedHash = user.password;
    bcrypt.compare(password, storedHash, async (err, isMatch) => {
      // err out
      if (err) {
        return next({ success: false, status: 401, message: err });
      }
      // invalidate if password hash doesn't match
      if (!isMatch) {
        return invalidate();
      }

      const { _id } = user;
      // create and send a JWT
      const payload = { _id };
      const secret = process.env.APP_SECRET;
      let token;
      try {
        token = jwt.sign(payload, secret, { expiresIn: '1h' });
      } catch (err) {
        return next(err);
      }

      if (process.env.NODE_ENV === 'production') {
        res.cookie('token', token, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
      } else {
        res.cookie('token', token, { httpOnly: true });
      }

      let session = await Session.findById({ _id });
      // create a session
      if (session) {
        session = await Session.updateOne(
          { _id },
          { token, createdAt: Date.now() },
        );
      } else {
        session = await Session.create({ _id, token });
      }

      if (!session) {
        return invalidate();
      }

      res.locals.result = { success: true, _id };
      return next();
    });
  } catch (err) {
    return next({ statusCode: 400, message: err.message });
  }
};

module.exports = login;
