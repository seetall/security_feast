// Importing modules
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/database.js";
import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import xssClean from "xss-clean";
import sanitize from "mongo-sanitize"; // Import mongo-sanitize

// For image handling
import path from "path";
import { fileURLToPath } from "url";

// Creating an express app
const app = express();

// Image handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure dotenv
dotenv.config();

app.use(xssClean()); // XSS Protection Middleware

// Helmet for security headers
app.use(
  helmet({
    contentSecurityPolicy: false, 
    crossOriginEmbedderPolicy: false, 
  })
);

// JSON config
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// File Upload Config
app.use(fileUpload());

// CORS configuration
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect to Database
connectDB();

// Input sanitization middleware
const sanitizeMiddleware = (req, res, next) => {
  if (req.body) {
    req.body = sanitize(req.body); 
  }
  if (req.query) {
    req.query = sanitize(req.query); 
  }
  if (req.params) {
    req.params = sanitize(req.params); 
  }
  next();
};

// Apply sanitization middleware globally
app.use(sanitizeMiddleware);

// Test route
app.get("/test", (req, res) => {
  res.send("Test route");
});

// Default route
app.get("/", (req, res) => {
  res.send("Helmet is now securing your app!");
});

// Configuring routes
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
