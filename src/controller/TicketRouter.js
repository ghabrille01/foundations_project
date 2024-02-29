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
    const data = await ticketService.postTicket(req.user.employee_id, req.body);
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
  "/manager",
  authenticateToken,
  validateIsManager,
  async (req, res) => {
    const data = await ticketService.getTickets();
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
  "/manager/:ticket_status",
  authenticateToken,
  validateIsManager,
  async (req, res) => {
    const data = await ticketService.getTicketsByStatus(
      req.params.ticket_status
    );
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

router.get("/", authenticateToken, validateIsEmployee, async (req, res) => {
  const data = await ticketService.getTicketsById(req.user.employee_id);

  if (data) {
    logger.info(`${req.user.username} has accessed their previous tickets.`);
    res.status(201).json({ message: "Previous Tickets:", data });
  } else {
    res
      .status(400)
      .json({ message: "Previous Tickets cannot be accessed", data });
  }
});

router.get(
  "/:ticket_status",
  authenticateToken,
  validateIsEmployee,
  async (req, res) => {
    const data = await ticketService.getTicketsByIdAndStatus(
      req.user.employee_id,
      req.params.ticket_status
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
  "/:ticket_id/:ticket_status",
  authenticateToken,
  validateIsManager,
  async (req, res) => {
    const data = await ticketService.updateTicketStatus(
      req.params.ticket_id,
      req.params.ticket_status,
      req.user.employee_id
    );
    if (data) {
      logger.info(
        `${req.user.username} changed ticket ${req.params.ticket_id} to ${req.params.ticket_status}`
      );
      res.status(201).json({ message: "Ticket:", data });
    } else {
      res.status(400).json({ message: "Tickets cannot be accessed", data });
    }
  }
);

module.exports = router;
