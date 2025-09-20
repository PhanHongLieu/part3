const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const sessionConfig = session({
  name: "sessionId", // tên cookie
  secret: process.env.SESSION_SECRET || "defaultsecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
  }),
  cookie: {
    httpOnly: true,
    secure: false, // bật true nếu dùng HTTPS
    maxAge: parseInt(process.env.SESSION_MAXAGE) || 1000 * 60 * 60, // 1h
    sameSite: "lax",
  },
});

module.exports = sessionConfig;
