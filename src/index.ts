import express from "express";
import cors from "cors";
import compression from "compression";
import helmet = require("helmet");
import dotenv from "dotenv";
import passport from "passport";
import { passportMiddle } from "./utils/passport";
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

passportMiddle(passport);

app.use(passport.initialize());
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

app.get("/", (req, res) => {
  if (req.session.token) {
    res.cookie("token", req.session.token);
    res.json({
      status: "session cookie set"
    });
  } else {
    res.cookie("token", "");
    res.json({
      status: "session cookie not set"
    });
  }
});

app.post(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile"]
  })
);

app.get(
  "/test",
  passport.authenticate("google", {
    failureRedirect: "/"
  }),
  (req, res) => {
    console.log("object");
    console.log(req.user);
    req.session.token = req.user.token;
    res.redirect("/");
  }
);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
