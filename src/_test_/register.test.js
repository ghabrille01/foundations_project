import { register } from "../userManagement/register.js";

describe("Register Test", () => {
    // successfully register a user
    test("Successfully register a user.", () => {
        // Arrange
        const username = "testuser";
        const password = "testpass";
        const expected = `User ${username} has been created.`;

        // ACT
        const result = register(username, password);

        // Assert
        expect(result).toBe(expected);
    })

    // successfuly fail username validation
    test("Successfully fail username validation.", () => {
        // Arrange
        const username = "testuser";
        const password = "testpass";
        const expected = `${username} is not available.`;

        // ACT
        const result = register(username, password);

        // Assert
        expect(result).toBe(expected);
    })
})