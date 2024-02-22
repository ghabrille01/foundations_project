// endpoint: /register
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { logger } = require("../util/logger");

const loginService = require("../service/LoginService");

// reading
router.post("/", async (req, res) => {
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
        expiresIn: "15m", // token expiration time (adjustable)
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
