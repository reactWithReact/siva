require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 3001;

// connecting to database
connectDB();

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("APIs working properly");
});

app.use("/api/manager/", require("./routes/accountRoutes"));

app.listen(port, () => console.log(`APIs listening on port ${port}!`));
