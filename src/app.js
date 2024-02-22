const express = require("express");
const app = express();
const registerRouter = require("./controller/RegisterRouter");
const loginRouter = require("./controller/LoginRouter");
const ticketRouter = require("./controller/TicketRouter");

const { logger } = require("./util/logger");

const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} : ${req.url}`);
  next();
});

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/ticket", ticketRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
