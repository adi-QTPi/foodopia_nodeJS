const salt_round = 10;
const bcrypt  = require("bcrypt");
const {db} = require("../models/foodopiaDB");

async function check_new_user_detail_entry_signup(req, res, next){
    const { user_name, name, role, password } = req.body;

    if(!user_name || !name || !role || !password){
        req.session.to_signup_page = {
            error:"enter all fields properly",
        };
        return res.redirect("../../static/signup");
    }

    let sql_query = `SELECT user_id FROM user WHERE user_name = ?`;

    db.query(sql_query, [user_name], (err, result, fields) =>{
        const result_obj = result[0];
        if(!result_obj){
            next();
        }
        else{
            req.session.to_signup_page = {
                error:"the username is taken... choose another username."
            };
            res.status(400).redirect("../../static/signup");
        }
    })
}

async function hash_password (req, res, next){
    const {password} = req.body;

    bcrypt.genSalt(salt_round, (err, salt) => {
        if(err)throw(err);
        bcrypt.hash(password, salt, function(err, hash) {
            req.body.pwd_hash = hash;
            next();
        });
    });
}

async function check_password_confirmation(req, res, next){
    const {password, d_password} = req.body;
    if(password === d_password){
        next();
    }
    else{
        req.session.to_signup_page = {
            error:"the passwords don't match"
        }
        res.status(400).redirect("../../static/signup");
    }
}

async function check_password_strength(req, res, next){
    const {password} = req.body;
    if(password.length < 8){
        req.session.to_signup_page = {
            error : "Password must be atleast 8 Characters long"
        }
        return res.status(400).redirect("../../static/signup");
    }
    next();
}

module.exports = {
    check_password_confirmation,
    check_new_user_detail_entry_signup,
    hash_password,
    check_password_strength,
}