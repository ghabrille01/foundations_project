// endpoint: /register
const express = require("express");
const router = express.Router();
const { logger } = require("../util/logger");
const authenticateToken = require("../util/authenticateToken");
const {
  validateIsEmployee,
  validateIsManager,
} = require("../util/validateRole");

const ticketService = require("../service/TicketService");
const { validateTicketBody } = require("../util/validateReqBody");

// Create
router.post(
  "/",
  authenticateToken,
  validateIsEmployee,
  validateTicketBody,
  async (req, res) => {
    const data = await ticketService.postTicket(req.body);
    if (data) {
      logger.info(`Created Ticket ID : ${data}`);
      res.status(201).json({ message: "Created Ticket ID", data });
    } else {
      res
        .status(400)
        .json({ message: "Ticket was not created", receivedData: req.body });
    }
  }
);

// Read
router.get(
  "/pendingtickets",
  authenticateToken,
  validateIsManager,
  async (req, res) => {
    const data = await ticketService.getPendingTickets();
    if (data) {
      logger.info(`${req.user.username} has accessed pending tickets.`);
      res.status(201).json({ message: "Pending Tickets:", data });
    } else {
      res
        .status(400)
        .json({ message: "Pending Tickets cannot be accessed", data });
    }
  }
);

router.get(
  "/previoustickets",
  authenticateToken,
  validateIsEmployee,
  async (req, res) => {
    const data = await ticketService.getNonPendingTicketsById(
      req.user.employee_id
    );
    if (data) {
      logger.info(`${req.user.username} has accessed their previous tickets.`);
      res.status(201).json({ message: "Previous Tickets:", data });
    } else {
      res
        .status(400)
        .json({ message: "Previous Tickets cannot be accessed", data });
    }
  }
);

// Update
router.put(
  "/approveticket/:ticket_id",
  authenticateToken,
  validateIsManager,
  validateTicketBody,
  async (req, res) => {
    const data = await ticketService.approveTicket(req.params.ticket_id);
    if (data) {
      logger.info(
        `${req.user.username} approved ticket: ${req.params.ticket_id}`
      );
      res.status(201).json({ message: "Ticket:", data });
    } else {
      res
        .status(400)
        .json({ message: "Approve Tickets cannot be accessed", data });
    }
  }
);

router.put(
  "/denyticket/:ticket_id",
  authenticateToken,
  validateIsManager,
  validateTicketBody,
  async (req, res) => {
    const data = await ticketService.denyTicket(req.params.ticket_id);
    if (data) {
      logger.info(
        `${req.user.username} denied ticket: ${req.params.ticket_id}`
      );
      res.status(201).json({ message: "Ticket:", data });
    } else {
      res
        .status(400)
        .json({ message: "Deny Tickets cannot be accessed", data });
    }
  }
);

module.exports = router;
