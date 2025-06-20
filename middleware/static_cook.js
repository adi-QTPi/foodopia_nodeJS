const {db} = require("../models/foodopiaDB")

async function update_order_status(req, res, next){
    let sql_query = "UPDATE `order` o SET status = 'cooking' WHERE EXISTS (SELECT 1 FROM item_order io WHERE io.order_id = o.order_id AND io.is_complete = 'taken'); UPDATE `order` o SET status = 'ready_to_serve' WHERE NOT EXISTS (SELECT 1 FROM item_order io WHERE io.order_id = o.order_id AND io.is_complete != 'complete') AND o.status != 'paid';";

    db.query(sql_query, (err,result,fields)=>{
        if(err)res.status(500).json(err);
        next();
    })
}

module.exports = {
    update_order_status,
}