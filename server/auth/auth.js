const User = require('../db/userSchema');
const jwt = require('jsonwebtoken');

const isAuthorized = async (req, res, next) => {
  console.log(`Incoming ${req.method} request from ${req.url}`.blue.bold);
  // Helper method to clear a token and invoke the next middleware
  const clearTokenAndNext = () => {
    res.clearCookie('token', { path: '/' });
    return next({
      success: false,
      statusCode: 401,
      message: 'You are not authorized to view this page.',
    });
  };

  try {
    if (!req.cookies) {
      return clearTokenAndNext();
    }
    // Read the cookie named 'token' and bail out if it doesn't exist
    const { token } = req.cookies;
    if (!token) {
      return clearTokenAndNext();
    }

    // Verify the validity of the token
    const _id = await jwt.verify(
      token,
      process.env.APP_SECRET,
      (err, decodedToken) => {
        if (err) {
          return clearTokenAndNext();
        }

        // Compare the token expiry (in seconds) to the current time (in milliseconds)
        // Bail out if the token has expired
        if (decodedToken.exp <= Date.now() / 1000) {
          return clearTokenAndNext();
        }

        return decodedToken._id;
      },
    );

    if (!_id) {
      return clearTokenAndNext();
    }

    const user = await User.findById(_id);

    if (!user) {
      return clearTokenAndNext();
    }

    res.locals.result = { success: true, data: user._id };
    return next();
  } catch (err) {
    return next({ statusCode: 400, message: err.message });
  }
};

module.exports = isAuthorized;
