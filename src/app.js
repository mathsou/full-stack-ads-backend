const express = require("express");
const cors = require("cors");

const router = require("./api/routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);
app.get("/", (_, res) => {
  res.status(200).json({ message: "API funcionando" });
});


module.exports = app;

