// endpoint: /register
const express = require("express");
const router = express.Router();
const { logger } = require("../util/logger");

const loginService = require("../service/LoginService");

// reading
router.post("/", async (req, res) => {
  const data = await loginService.login(req.body);
  if (data) {
    logger.info(`Employee Login: ${data}`);
    res.status(201).json({ message: "Employee Login", data });
  } else {
    res
      .status(400)
      .json({ message: "Employee failed login", receivedData: req.body });
  }
});

module.exports = router;
