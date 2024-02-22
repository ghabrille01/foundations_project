// endpoint: /register
const express = require("express");
const router = express.Router();
const { logger } = require("../util/logger");

const ticketService = require("../service/TicketService");

// reading
router.post("/", async (req, res) => {
  const data = await ticketService.postTicket(req.body);
  if (data) {
    logger.info(`Created Ticket ID : ${data}`);
    res.status(201).json({ message: "Created Ticket ID", data });
  } else {
    res
      .status(400)
      .json({ message: "Ticket was not created", receivedData: req.body });
  }
});

module.exports = router;
