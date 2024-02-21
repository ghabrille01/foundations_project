const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-west-2" });

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "Foundation_Employees";

// READ
async function getEmployeeByUsername(username) {
  console.log(username);
  const command = new ScanCommand({
    TableName,
    FilterExpression: "#u = :u",
    ExpressionAttributeNames: { "#u": "username" },
    ExpressionAttributeValues: { ":u": { S: username } },
  });

  try {
    const data = await documentClient.send(command);
    console.log(data);
    return data.Items[0];
  } catch (err) {
    console.error(err);
  }

  return null;
}

// CREATE
async function createEmployee(employee) {
  const command = new PutCommand({
    TableName,
    Item: employee,
  });

  try {
    const data = await documentClient.send(command);
    return data.Item;
  } catch (err) {
    console.error(`Unable to read item. Error: ${err}`);
  }

  return null;
}

module.exports = {
  getEmployeeByUsername,
  createEmployee,
};
