const { logger } = require("./logger");

const validateEmployeeBody = (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password) {
    logger.error(`Invalid request body. ${req.body}`);
    return res.status(400).json({ message: `Invalid request body.` });
  }
  next();
};

const validateTicketBody = (req, res, next) => {
  if (
    !req.body ||
    !req.body.amount ||
    !req.body.description ||
    !req.body.employee_id
  ) {
    logger.error(`Invalid request body. ${req.body}`);
    return res.status(400).json({ message: `Invalid request body.` });
  }
  next();
};

module.exports = { validateEmployeeBody, validateTicketBody };
