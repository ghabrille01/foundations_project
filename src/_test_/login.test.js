const { login } = require("../service/LoginService");

describe("Login Tests", () => {
  // successful login of a user
  test("Successfully login a user.", async () => {
    // Arrange
    const username = "testregistration";
    const password = "testpass";
    const expected = username;

    // ACT
    const result = await login({ username, password });

    // Assert
    expect(result.username).toBe(expected);
  });

  // login fails for invalid credentials
  test("Fail with invalid credentials.", async () => {
    // Arrange
    const username = "unknownUser";
    const password = "testpass";
    const expected = null;

    // ACT
    const result = await login({ username, password });

    // Assert
    expect(result).toBe(expected);
  });

  // login fails for empty data
  test("Fail with empty data.", async () => {
    // Arrange
    const expected = null;

    // ACT
    const result = await login({});

    // Assert
    expect(result).toBe(expected);
  });

  // check for data type
  // what do you need it to handle and how it should handle the situation
  // having more validation and check hose function in that file
});
