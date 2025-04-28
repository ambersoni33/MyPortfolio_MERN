const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');

// dotenv configuration
dotenv.config();

// express app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

// static files


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

// PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
