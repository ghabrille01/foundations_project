const { logger } = require("../util/logger");
const employeeDAO = require("../repository/EmployeeDAO");
const uuid = require("uuid");

async function postEmployee(receivedData) {
  if (validateEmployee(receivedData)) {
    let data = await employeeDAO.postEmployee({
      employee_id: uuid.v4(),
      username: receivedData.username,
      password: receivedData.password,
      role: "employee",
    });
    return data;
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
  postEmployee,
};
