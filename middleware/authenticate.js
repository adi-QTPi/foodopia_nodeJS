const bcrypt  = require("bcrypt");
const {db} = require("../models/foodopiaDB");

async function check_user_detail_entry_login(req, res, next){
    const { user_name, password } = req.body;
    if(!user_name || !password ){
        req.session.to_login_page = {
            error:"please enter all fields"
        }
        return res.redirect("../../static/login");
    }   
    next();
}

async function check_password_and_add_user_info (req, res,next){
    const { user_name, password } = req.body;
    let sql_query = `SELECT * FROM user WHERE user_name = ?`;

    db.query(sql_query, [user_name], (err, result, fields)=>{
        if(!result[0]){
            req.session.to_login_page = {
                error:"user_name not found, signup if a new user"
            }
            return res.redirect("../../static/login");
        } 
        const pwd_from_db = result[0].pwd_hash;
        bcrypt.compare(password, pwd_from_db, (err,bcrypt_result)=>{
            if(!bcrypt_result){
                req.session.to_login_page = {
                    error:"wrong password entered"
                }
                return res.redirect("../../static/login");
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