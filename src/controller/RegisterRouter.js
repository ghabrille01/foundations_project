// endpoint: /register
const express = require("express");
const router = express.Router();
const { logger } = require("../util/logger");

const registerService = require("../service/RegisterService");

// reading
router.post("/", async (req, res) => {
  const data = await registerService.postEmployee(req.body);
  if (data) {
    logger.info(`Created Employee: ${data.username}`);
    res.status(201).json({ message: `Created Employee ${data.username}` });
  } else {
    res
      .status(400)
      .json({ message: "Employee was not created", receivedData: req.body });
  }
});

module.exports = router;
