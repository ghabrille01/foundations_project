const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-west-2" });

const documentClient = DynamoDBDocumentClient.from(client);

const { logger } = require("../util/logger");

const TableName = "Foundation_Tickets";

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
async function getPendingTickets() {
  const command = new ScanCommand({
    TableName,
    FilterExpression: "#s = :s",
    ExpressionAttributeNames: { "#s": "ticket_status" },
    ExpressionAttributeValues: { ":s": "pending" },
  });

  try {
    const data = await documentClient.send(command);
    return data.Items;
  } catch (err) {
    logger.error(err);
  }

  return null;
}

async function getNonPendingTicketsById(employee_id) {
  const command = new ScanCommand({
    TableName,
    FilterExpression: "#s <> :s AND #e = :e",
    ExpressionAttributeNames: { "#s": "ticket_status", "#e": "employee_id" },
    ExpressionAttributeValues: { ":s": "pending", ":e": employee_id },
  });

  try {
    const data = await documentClient.send(command);
    return data.Items;
  } catch (err) {
    logger.error(err);
  }

  return null;
}

async function approveTicket(ticket_id) {
  const command = new UpdateCommand({
    TableName,
    Key: {
      ticket_id,
    },
    UpdateExpression: "set ticket_status = :ticket_status",
    ExpressionAttributeValues: {
      ":ticket_status": "approved",
    },
    ReturnValues: "ALL_NEW",
  });

  try {
    const data = await documentClient.send(command);
    return data.Attributes;
  } catch (err) {
    logger.error(err);
  }

  return null;
}

async function denyTicket(ticket_id) {
  const command = new UpdateCommand({
    TableName,
    Key: {
      ticket_id,
    },
    UpdateExpression: "set ticket_status = :ticket_status",
    ExpressionAttributeValues: {
      ":ticket_status": "denied",
    },
    ReturnValues: "ALL_NEW",
  });

  try {
    const data = await documentClient.send(command);
    return data.Attributes;
  } catch (err) {
    logger.error(err);
  }

  return null;
}

module.exports = { postTicket, getPendingTickets, getNonPendingTicketsById, approveTicket, denyTicket };
