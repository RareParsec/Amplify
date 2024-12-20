const accessGranted = (req, res, next) => {
  if (req.user && req.user.accessGranted === true) {
    return next();
  } else {
    return next(errorHandler(403, "Forbidden"));
  }
};
