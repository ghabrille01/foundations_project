const { users } = require("../storage/dataBase");
const { logger } = require("../util/logger");
const { getEmployeeByUsername } = require("../dao/EmployeeDAO");
const { error } = require("winston");

async function login(username, password) {
  getEmployeeByUsername(username)
    .then((emp) => {
      console.log(emp);
      console.log(username + ' = ' + emp.username.S);
      console.log(password + ' = ' + emp.password.S);
      if (username === emp.username.S && password === emp.password.S) {
        logger.info(`${username} has successfully logged in.`);
        return `${username} has successfully logged in.`;
      } else {
        logger.error(`${username} Entered Invalid Credentials`);
        return `Invalid Credentials`;
      }
    })
    .catch((err) => {
      logger.error(error);
      return err;
    });

  /*for (let i = 0; i < users.length; i++) {
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
  return `Invalid Credentials`;*/
}

module.exports = {
  login,
};
