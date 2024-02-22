const employeeDao = require("../repository/EmployeeDAO");
const bcrypt = require("bcrypt");

async function login(recievedData) {
  if (recievedData && validateEmployee(recievedData)) {
    const data = await employeeDao.getEmployeeByUsername(recievedData.username);
    if (
      validateEmployee(data) &&
      recievedData.username === data.username &&
      (await bcrypt.compare(recievedData.password, data.password))
    ) {
      return data;
    }
  }

  return null;
}

function validateEmployee(data) {
  if (!data || !data.username || !data.password) {
    return false;
  }
  return true;
}

module.exports = {
  login,
};
