const { register } = require("../userManagement/register");

describe("Register Tests", () => {
  // successful register of a user
  test("Successfully register a user.", () => {
    // Arrange
    const username = "testregistration";
    const password = "testpass";
    const expected = `User ${username} has been created.`;

    // ACT
    const result = register(username, password);

    // Assert
    expect(result).toBe(expected);
  });

  // register fails for invalid username
  test("Successfully fail username validation.", () => {
    // Arrange
    const username = 'testregistration';
    const password = "testpass";
    const expected = `${username} is not available.`;

    // ACT
    const result = register(username, password);

    // Assert
    expect(result).toBe(expected);
  });
});
