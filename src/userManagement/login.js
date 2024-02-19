const { users } = require("../storage/dataBase");
const { logger } = require("../util/logger");

function login(username, password) {

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].username === username &&
      users[i].password === password &&
      (users[i].role === "employee" || users[i].role === "manager")
    ) {
      logger.info(`${username} has successfully logged in.`);
      return `${username} has successfully logged in.`;
    }
  }

  logger.error(`${username} Entered Invalid Credentials`);
  return `Invalid Credentials`;
}

module.exports = {
  login,
};
