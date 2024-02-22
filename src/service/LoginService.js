const employeeDao = require("../repository/EmployeeDAO");

async function login(recievedData) {
  if (validateEmployee(recievedData)) {
    const data = await employeeDao.getEmployeeByUsername(recievedData.username);
    if (
      validateEmployee(data) &&
      recievedData.username === data.username &&
      recievedData.password === data.password
    ) {
      return data.username;
    }
  }

  return null;
}

function validateEmployee(data) {
  if (!data.username || !data.password) {
    return false;
  }
  return true;
}

module.exports = {
  login,
};
