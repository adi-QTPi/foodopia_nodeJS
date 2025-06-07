const salt_round = 10;
const bcrypt  = require("bcrypt");
const {db} = require("../models/foodopiaDB");

async function check_new_user_detail_entry_signup(req, res, next){
    const { user_name, name, role, password } = req.body;

    if(!user_name || !name || !role || !password){
        return res.status(400).json({"msg":"enter all fields please"});
    }

    let sql_query = `SELECT user_id FROM user WHERE user_name = ?`;

    db.query(sql_query, [user_name], (err, result, fields) =>{
        const result_obj = result[0];
        if(!result_obj){
            next();
        }
        else{
            res.status(400).json({"msg":"the username is taken... choose another username."})
        }
    })
}

async function hash_password (req, res, next){
    const {password} = req.body;

    bcrypt.genSalt(salt_round, (err, salt) => {
        if(err)throw(err);
        bcrypt.hash(password, salt, function(err, hash) {
            console.log(hash);
            req.body.pwd_hash = hash;
            next();
        });
    });
}

module.exports = {
    check_new_user_detail_entry_signup,
    hash_password
}