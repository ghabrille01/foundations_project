const ticketDAO = require("../repository/TicketDAO");
const uuid = require("uuid");

async function postTicket(receivedData) {
  if (validateTicket(receivedData)) {
    let data = await ticketDAO.postTicket({
      ticket_id: uuid.v4(),
      employee_id: receivedData.employee_id,
      amount: receivedData.amount,
      description: receivedData.description,
      status: "pending",
    });
    return data;
  }

  return null;
}

async function getPendingTickets() {
  return await ticketDAO.getPendingTickets();
}

async function getNonPendingTicketsById(di) {
  return await ticketDAO.getNonPendingTicketsById(id);
}

function validateTicket(data) {
  if (!data || !data.amount || !data.description || !data.employee_id) {
    return false;
  }
  return true;
}

module.exports = { postTicket, getPendingTickets, getNonPendingTicketsById };
