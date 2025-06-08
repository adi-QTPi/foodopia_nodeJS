const PORT = 9000;
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { db } = require("./models/foodopiaDB");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();
const {SESSION_SECRET_KEY} = process.env;

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const user_route_handler = require("./routes/api_users");
app.use("/api/user", user_route_handler);

const item_route_handler = require("./routes/api_item");
app.use("/api/item", item_route_handler);

const cat_route_handler = require("./routes/api_cat");
app.use("/api/cat", cat_route_handler);

const static_route_handler = require("./routes/static");
app.use("/static", static_route_handler);

app.listen(PORT, ()=>{
    console.log(`\nfoodopia server starts on port -> ${PORT}\n`);
})