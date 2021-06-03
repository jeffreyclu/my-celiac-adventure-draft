const isAdmin = async (req, res, next) => {
  if (res.locals.result.data.admin) {
    return next();
  } else {
    return next({
      success: false,
      statusCode: 401,
      message: 'You are not authorized to view this page.',
    });
  }
};

module.exports = isAdmin;
