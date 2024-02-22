require('dotenv').config()
const express = require("express");
const app = express();
const registerRouter = require("./controller/RegisterRouter");
const loginRouter = require("./controller/LoginRouter");
const ticketRouter = require("./controller/TicketRouter");

const { logger } = require("./util/logger");

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} : ${req.url}`);
  next();
});

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/ticket", ticketRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
