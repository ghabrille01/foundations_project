// endpoint: /register
const express = require("express");
const router = express.Router();
const { logger } = require("../util/logger");

const registerService = require("../service/RegisterService");
const { validateEmployeeBody } = require("../util/validateReqBody");
const { authenticateNoToken } = require("../util/authenticateToken");

// Create
router.post("/", authenticateNoToken, validateEmployeeBody, async (req, res) => {
  const data = await registerService.postEmployee(req.body);
  if (data) {
    logger.info(`Created Employee: ${data.username}`);
    res.status(201).json({ message: `Created Employee ${data.username}` });
  } else {
    res
      .status(400)
      .json({ message: "Employee was not created. Invalid Credentials.", receivedData: req.body });
  }
});

module.exports = router;
