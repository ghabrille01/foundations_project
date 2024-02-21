const { logger } = require("../util/logger");
const { createEmployee } = require("../dao/EmployeeDAO");
const uuid = require("uuid");

function register(username, password) {
  const newUser = {
    employee_id: uuid.v4(),
    username: username,
    password: password,
    role: "employee",
  };

  createEmployee(newUser)
    .then(() => {
      logger.info(`User ${username} has been created.`);
      return `User ${username} has been created.`;
    })
    .catch((err) => {
      logger.error(`${username} is not available.`);
      return `${username} is not available.`;
    });

  /*if (usernameAvailable(username)) {
    const newUser = {
      id: uuid.v4(),
      username: username,
      password: password,
      role: "employee",
    };

    createEmployee(newUser);

    logger.info(`User ${username} has been created.`);
    return `User ${username} has been created.`;
  } else {
    logger.error(`${username} is not available.`);
    return `${username} is not available.`;*/
}

function usernameAvailable(username) {
  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username) {
      return false;
    }
  }

  return true;
}

module.exports = {
  register,
};
