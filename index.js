const PORT = 9000;
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { db } = require("./models/foodopiaDB");

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const user_route_handler = require("./routes/api_users");
app.use("/api/user", user_route_handler);

const static_route_handler = require("./routes/static");
app.use("/static", static_route_handler);

app.listen(PORT, ()=>{
    console.log(`\nfoodopia server starts on port -> ${PORT}\n`);
})