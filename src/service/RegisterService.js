const employeeDAO = require("../repository/EmployeeDAO");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

async function postEmployee(receivedData) {
  if (await validateUsername(receivedData.username)) {
    let data = await employeeDAO.postEmployee({
      employee_id: uuid.v4(),
      username: receivedData.username,
      password: await bcrypt.hash(receivedData.password, 10),
      role: "employee",
    });
    return data ? data : null;
  }

  return null;
}

async function validateUsername(data) {
  const isTaken = await employeeDAO.getEmployeeByUsername(data);
  if (isTaken && data === isTaken.username) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  postEmployee,
};
