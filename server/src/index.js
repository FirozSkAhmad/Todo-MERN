const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes/route");
const PORT = process.env.PORT || 4000

const app = express();
app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.use("/", route);

app.listen(PORT, () => console.log("server running on port" + PORT));