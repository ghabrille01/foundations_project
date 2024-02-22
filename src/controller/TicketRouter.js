// endpoint: /register
const express = require("express");
const router = express.Router();
const { logger } = require("../util/logger");
const authenticateToken = require("../util/authenticateToken");

const ticketService = require("../service/TicketService");

// reading
router.post("/", authenticateToken, async (req, res) => {
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

router.get('/pendingtickets', authenticateToken, async (req, res) => {
  if(req.user.role != "manager") {
    res
      .status(400)
      .json({ message: `${req.user.username} is not authorized.`});
  }

  const data = await ticketService.getPendingTickets();
  if (data) {
    logger.info(`${req.user.username} has accessed pending tickets.`);
    res.status(201).json({ message: "Pending Tickets:", data });
  } else {
    res
      .status(400)
      .json({ message: "Pending Tickets cannot be accessed"});
  }
})

module.exports = router;
