const {db} = require("../models/foodopiaDB");

async function assign_table_for_new_order(req, res, next){
    const user_id = req.x_user.user_id;

    let sql_query = "SELECT DISTINCT table_no FROM `order` WHERE customer_id = ? AND status != 'paid'";

    db.query(sql_query, [user_id], (err,table_id, fields)=>{
        console.log(table_id);

        if(err)return res.status(500).json(err);
        if(!table_id.length){
            sql_query = "SELECT table_id FROM `table` WHERE is_empty = 1 LIMIT 1;";
            db.query(sql_query, (err, result, fields)=>{
                if(err)return res.status(500).json(err);
                if(!result.length){
                    return res.status(500).json({
                        msg: "no empty table is there, order later"
                    })
                }
                console.log("find new empty table");
                console.log(result[0].table_id);
                req.session.table_id = result[0].table_id;
                next()
            })
        }
        else{
            console.log("unpaid table_id -> ",table_id[0].table_no);
            req.session.table_id = table_id[0].table_no;
            next();
        }
    })
}

module.exports = {
    assign_table_for_new_order,
}