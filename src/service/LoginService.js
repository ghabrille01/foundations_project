const employeeDao = require("../repository/EmployeeDAO");
const bcrypt = require("bcrypt");

async function login(recievedData) {
  //if (recievedData && validateEmployee(recievedData)) {
  const data = await employeeDao.getEmployeeByUsername(recievedData.username);
  if (
    data &&
    recievedData.username === data.username &&
    (await bcrypt.compare(recievedData.password, data.password))
  ) {
    return data;
  }
  //}

  return null;
}

module.exports = {
  login
};
