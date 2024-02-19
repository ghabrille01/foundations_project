const { login } = require("../userManagement/login");

describe("Login Tests", () => {
  // successful login of a user
  test("Successfully register a user.", () => {
    // Arrange
    const username = "authenticatedUser1";
    const password = "testpass";
    const expected = `${username} has successfully logged in.`;

    // ACT
    const result = login(username, password);

    // Assert
    expect(result).toBe(expected);
  });

  // login fails for invalid credentials
  test("Successfully register a user.", () => {
    // Arrange
    const username = "unknownUser";
    const password = "testpass";
    const expected = `Invalid Credentials`;

    // ACT
    const result = login(username, password);

    // Assert
    expect(result).toBe(expected);
  });

  // check for data type
  // what do you need it to handle and how it should handle the situation
  // having more validation and check hose function in that file
});
