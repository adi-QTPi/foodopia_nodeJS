const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

async function handle_login_assign_jwt(req, res){
    const curr_user = req.header.x_user;
    const token = jwt.sign(curr_user, JWT_SECRET, {
        expiresIn: "24h"
    });

    res.cookie("token", token, {
        httpOnly:true,
        secure : true,
        maxAge : 60000 * 60 * 24,
    }).status(200)
    .redirect("/static/profile")
}

module.exports = {
    handle_login_assign_jwt,
}