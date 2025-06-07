const bcrypt  = require("bcrypt");
const {db} = require("../models/foodopiaDB");

async function check_user_detail_entry_login(req, res, next){
    const { user_name, password } = req.body;
    if(!user_name || !password ){
        res.status(400).json({"msg": "please give the correct fields..."});
        // res.redirect("/user/login");
    }
    next();
}

async function check_password_and_add_user_info (req, res,next){
    const { user_name, password } = req.body;
    let sql_query = `SELECT * FROM user WHERE user_name = ?`;

    db.query(sql_query, [user_name], (err, result, fields)=>{
        if(!result[0]){
            return res.status(404).json({"msg": "user_name not found, signup if a new user."});
        } 
        const pwd_from_db = result[0].pwd_hash;
        bcrypt.compare(password, pwd_from_db, (err,bcrypt_result)=>{
            if(!bcrypt_result){
                return res.status(403).json({"msg":"wrong password entered"});
            }
            else{
                delete result[0]["pwd_hash"];
                req.header.x_user = result[0];
            }
            next();
        })
    })
}

module.exports = {
    check_user_detail_entry_login,
    check_password_and_add_user_info,
}