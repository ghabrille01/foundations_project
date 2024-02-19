const { users } = require("../storage/dataBase");
const { logger } = require("../util/logger");

function register(username, password) {

    if (usernameAvailable(username)) {
        const newUser = {
            id: users.length,
            username: username,
            password: password,
            role: "employee",
        }

        users.push(newUser);

        logger.info(`User ${username} has been created.`);
        return `User ${username} has been created.`;
    } else {
        logger.error(`${username} is not available.`);
        return `${username} is not available.`;
    }
    
}

function usernameAvailable(username) {
    for (let i = 0; i < users.length; i++) {
        if (username === users[i].username) {
            return false
        }
    }

    return true;
}

module.exports = {
    register
}