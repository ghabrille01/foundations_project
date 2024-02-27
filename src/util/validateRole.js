const { logger } = require('./logger');

const validateIsEmployee = (req, res, next) => {
  if (
    !req.user.role ||
    req.user.role != "employee" ||
    req.user.role != "manager"
  ) {
    logger.error(`User failed employee authorization.`);
    return res
      .status(400)
      .json({ message: `User is not authorized.` });
  }
  next();
};

const validateIsManager = (req, res, next) => {
  if (!req.user.role || req.user.role != "manager") {
    logger.error(`User failed manager authorization.`);
    return res
      .status(400)
      .json({ message: `User is not authorized.` });
  }
  next();
};

module.exports = { validateIsEmployee, validateIsManager };
