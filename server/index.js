const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotanv = require("dotenv");
const path = require("path");
const { bgCyan } = require("colors");
const https = require("https");
const fs = require("fs");
require("colors");
const connectDb = require("./config/config");

//dotenv config
dotanv.config();
//db config
connectDb();
//rest object
const app = express();

//middlwares
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable logging only in development mode
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  app.use(morgan("dev"));
}

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billsRoute"));
app.use("/api/categories", require("./routes/categoryRoutes"));

//For local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8080;

  // Try to use HTTPS if certificates exist, otherwise fall back to HTTP
  try {
    const privateKey = fs.readFileSync(path.join(__dirname, "certs/private-key.pem"), "utf8");
    const certificate = fs.readFileSync(path.join(__dirname, "certs/certificate.pem"), "utf8");
    const credentials = { key: privateKey, cert: certificate };

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(PORT, () => {
      console.log(`Secure Server Running On Port ${PORT}`.bgCyan.white);
    });
  } catch (err) {
    // Fall back to HTTP if certificates don't exist
    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT} (HTTP)`.bgCyan.white);
    });
  }
}

module.exports = app;
