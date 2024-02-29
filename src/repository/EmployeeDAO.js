require("dotenv").config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-west-2" });

const documentClient = DynamoDBDocumentClient.from(client);

const { logger } = require("../util/logger");

const TableName = process.env.EMPLOYEE_TABLE_NAME;

// READ
async function getEmployeeByUsername(username) {
  const command = new QueryCommand({
    TableName,
    IndexName: "username-index",
    KeyConditionExpression: "#u = :u",
    ExpressionAttributeNames: { "#u": "username" },
    ExpressionAttributeValues: { ":u": username },
  });

  try {
    const data = await documentClient.send(command);
    return data.Items[0];
  } catch (err) {
    logger.error(err);
  }

  return null;
}

// CREATE
async function postEmployee(Item) {
  const command = new PutCommand({
    TableName,
    Item,
    ConditionExpression: "attribute_not_exists(username)",
  });

  try {
    const data = await documentClient.send(command);
    return Item;
  } catch (err) {
    logger.error(`Unable to read item. Error: ${err}`);
  }

  return null;
}

module.exports = {
  postEmployee,
  getEmployeeByUsername,
};
