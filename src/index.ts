import express from "express";
import cors from "cors";
import compression from "compression";
import helmet = require("helmet");
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: "*",
    exposedHeaders: "Authorization"
  })
);

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: ["com.example.test"]
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(helmet());

app.use(compression());

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
