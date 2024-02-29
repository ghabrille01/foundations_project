require("dotenv").config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  QueryCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-west-2" });

const documentClient = DynamoDBDocumentClient.from(client);

const { logger } = require("../util/logger");

const TableName = process.env.TICKET_TABLE_NAME;

// CREATE
async function postTicket(Item) {
  const command = new PutCommand({
    TableName,
    Item,
  });

  try {
    const data = await documentClient.send(command);
    return Item;
  } catch (err) {
    logger.error(`Unable to read item. Error: ${err}`);
  }

  return null;
}

// READ
async function getTickets() {
  const command = new ScanCommand({
    TableName,
  });

  try {
    const data = await documentClient.send(command);
    return data.Items ? data.Items : null;
  } catch (err) {
    logger.error(err);
  }

  return null;
}

async function getTicketsByStatus(status) {
  const command = new QueryCommand({
    TableName,
    IndexName: "ticket_status-index",
    KeyConditionExpression: "#s = :s",
    ExpressionAttributeNames: { "#s": "ticket_status" },
    ExpressionAttributeValues: { ":s": status },
  });

  try {
    const data = await documentClient.send(command);
    return data.Items ? data.Items : null;
  } catch (err) {
    logger.error(err);
  }

  return null;
}

async function getTicketsById(employee_id) {
  const command = new QueryCommand({
    TableName,
    IndexName: "employee_id-index",
    KeyConditionExpression: "#e = :e",
    ExpressionAttributeNames: { "#e": "employee_id" },
    ExpressionAttributeValues: { ":e": employee_id },
  });

  try {
    const data = await documentClient.send(command);
    return data.Items ? data.Items : null;
  } catch (err) {
    logger.error(err);
  }

  return null;
}

async function getTicketsByIdAndStatus(employee_id, status) {
  const command = new QueryCommand({
    TableName,
    IndexName: "employee_id-index",
    KeyConditionExpression: "#e = :e",
    FilterExpression: "#s = :s",
    ExpressionAttributeNames: { "#s": "ticket_status", "#e": "employee_id" },
    ExpressionAttributeValues: { ":s": status, ":e": employee_id },
  });

  try {
    const data = await documentClient.send(command);
    return data.Items ? data.Items : null;
  } catch (err) {
    logger.error(err);
  }

  return null;
}

async function updateTicketStatus(ticket_id, status, resolver) {
  const command = new UpdateCommand({
    TableName,
    Key: {
      ticket_id,
    },
    UpdateExpression:
      "set ticket_status = :ticket_status, resolver = :resolver",
    ExpressionAttributeValues: {
      ":ticket_status": status,
      ":resolver": resolver,
    },
    ReturnValues: "ALL_NEW",
  });

  try {
    const data = await documentClient.send(command);
    return data.Attributes ? data.Attributes : null;
  } catch (err) {
    logger.error(err);
  }

  return null;
}

module.exports = {
  postTicket,
  getTickets,
  getTicketsByStatus,
  getTicketsById,
  getTicketsByIdAndStatus,
  updateTicketStatus,
};
