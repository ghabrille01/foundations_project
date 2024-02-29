// endpoint: /login
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { logger } = require("../util/logger");
const { validateEmployeeBody } = require("../util/validateReqBody");
const { authenticateNoToken } = require("../util/authenticateToken");

const loginService = require("../service/LoginService");

// Read
router.post("/", authenticateNoToken, validateEmployeeBody, async (req, res) => {
  const data = await loginService.login(req.body);
  if (data) {
    const token = jwt.sign(
      {
        employee_id: data.employee_id,
        username: data.username,
        role: data.role,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "15m",
      }
    );

    logger.info(`${data.role} Login: ${data.username} Token: ${token}`);
    res
      .status(201)
      .json({ message: `${data.role} Login: ${data.username}`, token });
  } else {
    res.status(400).json({ message: "Failed login", receivedData: req.body });
  }
});

module.exports = router;
