const ticketDAO = require("../repository/TicketDAO");
const uuid = require("uuid");

async function postTicket(employee_id, receivedData) {
  let data = await ticketDAO.postTicket({
    ticket_id: uuid.v4(),
    ticket_type: receivedData.ticket_type,
    employee_id,
    amount: receivedData.amount,
    description: receivedData.description,
    ticket_status: "pending",
    resolver: "",
  });
  return data ? data : null;
}

async function getTickets(){
  const data = await ticketDAO.getTickets();
  return data ? data : null;
}

async function getTicketsByStatus(status) {
  const data = await ticketDAO.getTicketsByStatus(status);
  return data ? data : null;
}

async function getTicketsById(id) {
  const data = await ticketDAO.getTicketsById(id);
  return data ? data : null;
}

async function getTicketsByIdAndStatus(id, status) {
  const data = await ticketDAO.getTicketsByIdAndStatus(id, status);
  return data ? data : null;
}

async function updateTicketStatus(id, status, resolver) {
  const data = await ticketDAO.updateTicketStatus(id, status, resolver);
  return data ? data : null;
}

module.exports = {
  postTicket,
  getTickets,
  getTicketsByStatus,
  getTicketsById,
  getTicketsByIdAndStatus,
  updateTicketStatus,
};
