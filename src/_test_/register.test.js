const { postEmployee } = require('../service/RegisterService');
const uuid = require('uuid');

describe("Register Tests", () => {
  // successful register of a user
  test("Successfully register a user.", async () => {
    // Arrange
    const username = uuid.v4().slice(0,10);
    const password = "testpass";
    const expected = username;

    // ACT
    const result = await postEmployee({ username, password });

    // Assert
    expect(result.username).toBe(expected);
  });

  // register fails for invalid username
  test("Failed username validation.", async () => {
    // Arrange
    const username = 'testregistration';
    const password = "testpass";
    const expected = null;

    // ACT
    const result = await postEmployee({ username, password });

    // Assert
    expect(result).toBe(expected);
  });

  // register fails for empty input
  test("Failed empty input.", async () => {
    // Arrange
    const expected = null;

    // ACT
    const result = await postEmployee({});

    // Assert
    expect(result).toBe(expected);
  });
});
