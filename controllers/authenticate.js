const salt_round = 10;
const bcrypt  = require("bcrypt");
const {db} = require("../models/foodopiaDB");

async function handle_post_login_existing_user(req, res){
    console.log(req.body);
    res.status(200).json({"msg":"login controller "});
}

module.exports = {
    handle_post_login_existing_user,
}