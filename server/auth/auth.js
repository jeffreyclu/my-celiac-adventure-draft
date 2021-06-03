const User = require('../db/userSchema');
const Session = require('../db/sessionSchema');
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
    // Bail out if no request cookies
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

    // Bail out if the id doesn't exist
    if (!_id) {
      return clearTokenAndNext();
    }

    // Find the user associated with the id
    const user = await User.findById(_id);

    // Bail out if user not found
    if (!user) {
      return clearTokenAndNext();
    }

    // Try to find an existing session associated with the user id
    // and update it if the session exists
    // Or create a new session
    let session = await Session.findById({ _id });

    if (session) {
      session = await Session.updateOne(
        { _id },
        { token, createdAt: Date.now() },
      );
    } else {
      session = await Session.create({ _id, token });
    }

    // Bail out if we couldn't create a session
    if (!session) {
      return clearTokenAndNext();
    }

    // Send back the user's id, username, email, and admin or paid status
    const { username, email, admin, paid } = user;

    res.locals.result = {
      success: true,
      data: { _id, username, email, admin, paid },
    };

    console.log(
      `Authenticated user: ${JSON.stringify({
        _id: user._id,
        username,
        email: user.email,
        admin,
        paid,
      })}`.green,
    );

    return next();
  } catch (err) {
    return next({ statusCode: 400, message: err.message });
  }
};

module.exports = isAuthorized;
