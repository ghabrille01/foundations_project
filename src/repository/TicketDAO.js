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
    return Item.ticket_id;
  } catch (err) {
    logger.error(`Unable to read item. Error: ${err}`);
  }

  return null;
}

module.exports = { postTicket}