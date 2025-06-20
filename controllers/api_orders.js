const {db} = require("../models/foodopiaDB");

async function handle_post_orders(req, res){
    const curr_user_id = req.x_user.user_id;
    console.log(req.body);
    console.log("user_id -> ",req.x_user.user_id);

    let total_price = 0;
    for(let items of req.body){
        total_price += items.price * items.quantity;
    }

    const table_id = req.session.table_id;
    const now = new Date();
    const order_at = now.toString();
    console.log("table_id -> ",table_id, "order_at -> ", order_at);

    sql_query = "INSERT INTO `order` (order_at, table_no, customer_id, status, total_price) VALUES (?, ?, ?, ?, ?);";

    db.query(sql_query, [now, table_id, curr_user_id, "received", total_price], (err, result, fields)=>{
        if(err){
            return res.status(500).json({
                msg:"second one",
                err
            });
        }
        const order_id = Number(result.insertId);
        const req_body = req.body;
        sql_query = "INSERT INTO item_order (order_id, item_id, quantity, instruction) VALUES (?, ?, ?, ?);"
        res.status(200).json({
            msg:"order to ban gya deal done"
        })
        for(let item of req_body){
            db.query(sql_query, [order_id, item.item_id, item.quantity, item.instruction], (err,result,fields)=>{
                if(err){
                    return res.status(500).json(err);
                }
                console.log("item id ", item.item_id, "added");
            });
        }

        sql_query = "UPDATE `table` SET is_empty = 0 WHERE table_id = ?";
        db.query(sql_query, [table_id], (err,result, fields)=>{
            if(err){
                return res.status(500).json({
                    msg:"last one",
                    err
                });
            }
        });
    })
}

async function set_date_to_show_orders(req,res){
    console.log(req.body);
    req.session.date_to_fetch_order_for = req.body.date_to_fetch_order_for;
    res.status(200).redirect("/static/orders");
}

module.exports = {
    handle_post_orders,
    set_date_to_show_orders,
}