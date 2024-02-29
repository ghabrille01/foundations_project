const {
  postTicket,
  getTickets,
  getTicketsByStatus,
  getTicketsById,
  getTicketsByIdAndStatus,
  updateTicketStatus,
} = require("../service/TicketService");

describe("Ticket Tests", () => {
  // successful post a ticket
  test("Successfully post a ticket.", async () => {
    // Arrange
    const employee_id = "b54c16a3-cdce-427b-b109-dc31d0b781af";
    const amount = 249;
    const ticket_type = "reimburse";
    const description = "test description";
    const expected = employee_id;

    // ACT
    const result = await postTicket(employee_id, {
      ticket_type,
      amount,
      description,
    });

    // Assert
    expect(result.employee_id).toBe(expected);
  });

  // Get all tickets
  test("Get all tickets.", async () => {
    // Arrange
    const expected = true;

    // ACT
    const result = await getTickets();

    // Assert
    expect(result).toBeTruthy()
  });

  // Get all pending tickets
  test("Get all pending tickets.", async () => {
    // Arrange
    const ticket_status = "pending";
    let result = true;

    // ACT
    const data = await getTicketsByStatus(ticket_status);
    if (data) {
      data.forEach((ticket) => {
        if (ticket.ticket_status != ticket_status) {
          result = false;
          return;
        }
      });
    }
    // Assert
    expect(result).toBe(true);
  });

  // Get all of a specific employee
  test("Get all previous tickets from an employee", async () => {
    // Arrange
    const employee_id = "b54c16a3-cdce-427b-b109-dc31d0b781af";
    let result = true;

    // ACT
    const data = await getTicketsById(employee_id);
    if (data) {
      data.forEach((ticket) => {
        if (ticket.employee_id != employee_id) {
          result = false;
          return;
        }
      });
    }
    // Assert
    expect(result).toBe(true);
  });

  // Get specific employee tickets by ticket_status
  test("Get all previous tickets from an employee", async () => {
    // Arrange
    const employee_id = "b54c16a3-cdce-427b-b109-dc31d0b781af";
    const ticket_status = "approved"
    let result = true;

    // ACT
    const data = await getTicketsByIdAndStatus(employee_id, ticket_status);
    if (data) {
      data.forEach((ticket) => {
        if (ticket.employee_id != employee_id && ticket.ticket_status != ticket_status) {
          result = false;
          return;
        }
      });
    }
    // Assert
    expect(result).toBe(true);
  });

  // Update specific employee ticket's ticket_status
  test("Update specific employee ticket's ticket_status", async () => {
    // Arrange
    const ticket_id = "362f5a8b-e0a5-4d4f-b1e1-c6c7b1983d2f";
    const employee_id = "b54c16a3-cdce-427b-b109-dc31d0b781af";
    const ticket_status = "approved"

    // ACT
    const result = await updateTicketStatus(ticket_id, ticket_status, employee_id);

    // Assert
    expect(result.ticket_id).toBe(ticket_id);
    expect(result.ticket_status).toBe(ticket_status);
    expect(result.employee_id).toBe(employee_id);
  });

});
