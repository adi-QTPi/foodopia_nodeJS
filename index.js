const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { db } = require("./models/foodopiaDB");
const session = require("express-session");
require("dotenv").config();
const PORT = process.env.SERVER_PORT;
const {SESSION_SECRET_KEY} = process.env;

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const user_route_handler = require("./routes/api_users");
app.use("/api/user", user_route_handler);

const item_route_handler = require("./routes/api_item");
app.use("/api/item", item_route_handler);

const cat_route_handler = require("./routes/api_cat");
app.use("/api/cat", cat_route_handler);

const orders_route_handler = require("./routes/api_orders");
app.use("/api/orders", orders_route_handler)

const cook_route_handler = require("./routes/api_cook");
app.use("/api/cook", cook_route_handler);

const admin_route_handler = require("./routes/api_admin");
app.use("/api/admin", admin_route_handler);

const pay_route_handler = require("./routes/api_pay");
app.use("/api/pay", pay_route_handler);

const static_cook_route_handler = require("./routes/static_cook");
app.use("/static/cook", static_cook_route_handler);

const static_admin_route_handler = require("./routes/static_admin");
app.use("/static/admin", static_admin_route_handler);

const static_route_handler = require("./routes/static");
app.use("/static", static_route_handler);

const default_route_handler = require("./routes/root_route");
app.use("/",default_route_handler);

app.listen(PORT, ()=>{
    console.log(`\nfoodopia server starts on port -> ${PORT}\nclick on http://localhost:${PORT}`);
})