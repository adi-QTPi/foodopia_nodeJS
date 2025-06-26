const {db} = require("../models/foodopiaDB");

async function handle_get_all_users(req, res){
    let sql_query = `SELECT user_id, user_name, name, profile_pic, role FROM user;`
    db.query(sql_query, (err, result, fields)=>{
        if(err){
            return res.status(500).send(err);
        }
        return res.status(200).json(result);
    })
}

async function handle_get_user_by_id(req, res){
    const user_id = req.params.id;
    let sql_query = `SELECT user_name, name, profile_pic, role FROM user WHERE user_id = ?;`
    db.query(sql_query, [user_id],(err, result, fields) => {
        if(err)return res.status(500).send(err);
        const result_obj = result[0];
        if(!result_obj){
            return res.status(404).json({
                "msg": "no user found"
            })
        }
        return res.status(200).json(result_obj);
    })
}

async function handle_delete_user_by_id(req, res){
    const user_id = req.params.id;
    let sql_query = `DELETE FROM user WHERE user_id = ?;`
    
    db.query(sql_query, [user_id],(err,result, fields)=>{
        if(err)return res.status(500).send(err);
        return res.status(200).json({"msg":`${user_id} deleted successfully`});
    })
}

async function admin_handle_post_create_new_user(req,res){
    const {user_name, name, role, pwd_hash} = req.body;

    let sql_query = `INSERT INTO user (user_name, name, pwd_hash, role) VALUES (?,?,?,?)`;
    db.execute(sql_query, [user_name, name, pwd_hash, role], (err,result, fields)=>{
        if(err){
            return res.status(500).send(err);
        }
        return res.redirect("/static/profile");
    })
}

async function handle_post_create_new_user(req,res){
    const {user_name, name, role, pwd_hash} = req.body;

    let sql_query = `INSERT INTO user (user_name, name, pwd_hash, role) VALUES (?,?,?,?)`;
    db.execute(sql_query, [user_name, name, pwd_hash, "customer"], (err,result, fields)=>{
        if(err){
            return res.status(500).send(err);
        }
        req.session.to_login_page = {
            message:"New User created ! login to continue"
        }
        return res.redirect("/static/login");
    })
}

async function handle_post_user_logout(req, res){
    const to_login_page = {
        message:"Successfully logged out."
    }
    req.session.to_login_page = to_login_page;
    res.clearCookie("token");
    return res.status(200).redirect("/static/login");
}

module.exports ={
    handle_get_all_users,
    handle_get_user_by_id,
    handle_delete_user_by_id,
    handle_post_create_new_user,
    handle_post_user_logout,
    admin_handle_post_create_new_user,
}