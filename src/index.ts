import express from "express";
import cors from "cors";
import compression from "compression";
import helmet = require("helmet");
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import { rSession } from "./modules/session/routes";
import { rIntents } from "./modules/intents/routes";
import { rEntity } from "./modules/entity/routes";
import { rTest } from "./modules/test/routes";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: "*",
    exposedHeaders: "authorization"
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

app.use(require("morgan")("dev"));

routes(app);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

function routes(app: express.Application) {
  function router() {
    return express.Router({
      caseSensitive: true
    });
  }

  app.use("/api/v1/test_message", rTest(router()));

  app.use("/api/v1/entity", rEntity(router()));

  app.use("/api/v1/intent", rIntents(router()));
  app.use("/api/v1/session", rSession(router()));
}
