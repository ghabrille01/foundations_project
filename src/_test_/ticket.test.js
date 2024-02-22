const { postTicket } = require("../service/TicketService");

describe("Ticket Tests", () => {
  // successful post a ticket
  test("Successfully post a ticket.", async () => {
    // Arrange
    const employee_id = "995c3875-e432-41a0-9937-5d6dc77c9e98";
    const amount = 249;
    const description = "test description";
    const expected = employee_id;

    // ACT
    const result = await postTicket({
      employee_id, amount, description
    });

    // Assert
    expect(result.employee_id).toBe(expected);
  });

  // register fails for empty input
  test("Failed empty input.", async () => {
    // Arrange
    const expected = null;

    // ACT
    const result = await postTicket({});

    // Assert
    expect(result).toBe(expected);
  });
});
