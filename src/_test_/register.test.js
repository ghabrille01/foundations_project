const { postEmployee } = require('../service/RegisterService');

describe("Register Tests", () => {
  // successful register of a user
  test("Successfully register a user.", async () => {
    // Arrange
    const username = "testregistration5";
    const password = "testpass";
    const expected = username;

    // ACT
    const result = await postEmployee({ username: username, password: password });

    // Assert
    expect(result).toBe(expected);
  });

  // register fails for invalid username
  test("Failed username validation.", async () => {
    // Arrange
    const username = 'testregistration';
    const password = "testpass";
    const expected = null;

    // ACT
    const result = await postEmployee({ username: username, password: password });

    // Assert
    expect(result).toBe(expected);
  });

  // register fails for invalid username
  test("Failed empty input.", async () => {
    // Arrange
    const expected = null;

    // ACT
    const result = await postEmployee({username: "", password: ""});

    // Assert
    expect(result).toBe(expected);
  });
});
