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

const user_route_handler = require("./routes/user");

app.use("/user", user_route_handler);


app.listen(PORT, ()=>{
    console.log(`\nfoodopia server starts on port -> ${PORT}\n`);
})