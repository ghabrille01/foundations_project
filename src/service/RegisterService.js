const employeeDAO = require('../repository/EmployeeDAO');
const uuid = require("uuid");

async function postEmployee(receivedData) {
  if (validateEmployee(receivedData)) {
    if (await validateUsername(receivedData)){
      let data = await employeeDAO.postEmployee({
        employee_id: uuid.v4(),
        username: receivedData.username,
        password: receivedData.password,
        role: "employee",
      });
      return data;
    }
  }

  return null;
}

async function validateUsername(data) {
  const isTaken = await employeeDAO.getEmployeeByUsername(data.username);
  if(isTaken && validateEmployee(isTaken)){
    if(data.username == isTaken.username) {
      return false;
    } else {
      return true;
    }
  } 
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
