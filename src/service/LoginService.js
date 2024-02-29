const employeeDao = require("../repository/EmployeeDAO");
const bcrypt = require("bcrypt");

async function login(recievedData) {
  const data = await employeeDao.getEmployeeByUsername(recievedData.username);
  if (
    data &&
    recievedData.username === data.username &&
    (await bcrypt.compare(recievedData.password, data.password))
  ) {
    return data ? data : null;
  }

  return null;
}

module.exports = {
  login,
};
