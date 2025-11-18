// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const metrics = require("./metrics"); // module for prom-client setup

const url = process.env.DATABASE_URL;
const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Routers
const router = require("./router.js");
app.use("", router);

// Expose metrics endpoint for Prometheus
app.get("/metrics", async (req, res) => {
  try {
    res.set('Content-Type', metrics.register.contentType);
    res.end(await metrics.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// Connect to MongoDB and start server
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to the DB");
    app.listen(port, host, () => {
      console.log(`🚀 Server running at http://${host}:${port}`);
    });
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));

