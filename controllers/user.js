const {db} = require("../models/foodopiaDB");

async function handle_get_all_users(req, res){
    let sql_query = `SELECT user_id, user_name, name, profile_pic, role FROM user;`
    db.query(sql_query, (err, result, fields)=>{
        if(err){
            return res.status(500).send(err);
        }
        if(!result[0])console.log("empty user table");
        return res.status(200).json(result);
    })
}

async function handle_get_user_by_id(req, res){
    const user_id = req.params.id;
    let sql_query = `SELECT user_name, name, profile_pic, role FROM user WHERE user_id = ?;`
    db.query(sql_query, [user_id],(err, result, fields) => {
        if(err)return res.status(500).send(err);
        const result_obj = result[0];
        console.log(result_obj);
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

async function handle_post_create_new_user(req,res){
    const {user_name, name, role, pwd_hash} = req.body;

    let sql_query = `INSERT INTO user (user_name, name, pwd_hash, role) VALUES (?,?,?,?)`;
    db.execute(sql_query, [user_name, name, pwd_hash, role], (err,result, fields)=>{
        if(err){
            return res.status(500).send(err);
        }
        console.log("new entry added.");
        return res.status(200).json({"msg":"new user created"});
    })

}

module.exports ={
    handle_get_all_users,
    handle_get_user_by_id,
    handle_delete_user_by_id,
    handle_post_create_new_user
}