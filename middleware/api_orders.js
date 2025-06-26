const {db} = require("../models/foodopiaDB");

async function assign_table_for_new_order(req, res, next){
    const user_id = req.x_user.user_id;

    let sql_query = "SELECT DISTINCT table_no FROM `order` WHERE customer_id = ? AND status != 'paid'";

    db.query(sql_query, [user_id], (err,table_id, fields)=>{
        if(err){
            req.session.to_error_page = {
                error : JSON.stringify(err),
            }
            return res.redirect("/static/error");
        }
        if(!table_id.length){
            sql_query = "SELECT table_id FROM `table` WHERE is_empty = 1 LIMIT 1;";
            db.query(sql_query, (err, result, fields)=>{
                if(err){
                    req.session.to_error_page = {
                        error : JSON.stringify(err),
                    }
                    return res.redirect("/static/error");
                }
                if(!result.length){
                    req.session.to_error_page = {
                        error : "no empty table is there, order later",
                    }
                    return res.status(200).redirect("/static/error");
                }
                req.session.table_id = result[0].table_id;
                next()
            })
        }
        else{
            req.session.table_id = table_id[0].table_no;
            next();
        }
    })
}

module.exports = {
    assign_table_for_new_order,
}