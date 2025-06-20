const {db} = require("../models/foodopiaDB");
const p_db = db.promise();
const mysql = require('mysql2/promise');

async function handle_post_orders(req, res){
    const curr_user_id = req.x_user.user_id;
    let total_price = 0;
    for(let items of req.body){
        total_price += items.price * items.quantity;
    }

    const table_id = req.session.table_id;
    const now = new Date();
    const order_at = now.toString();

    try{
        await p_db.beginTransaction();

        let sql_query = "INSERT INTO `order` (order_at, table_no, customer_id, status, total_price) VALUES (?, ?, ?, ?, ?)";
        const [result] = await p_db.execute(sql_query, [now, table_id, curr_user_id, "received", total_price]);
        const order_id = Number(result.insertId);

        const req_body = req.body;

        sql_query =  "INSERT INTO item_order (order_id, item_id, quantity, instruction) VALUES (?, ?, ?, ?);"

        for(let item of req_body){
            await p_db.execute(sql_query, [order_id, item.item_id, item.quantity, item.instruction]);
        }

        sql_query = "UPDATE `table` SET is_empty = 0 WHERE table_id = ?";
        await p_db.execute(sql_query, [table_id]);

        await p_db.commit();

        return res.status(200).json({
            msg:"success"
        })
    }
    catch(err){
        await p_db.rollback();
        req.session.to_error_page = {
            error:JSON.stringify(err)
        }
        return res.status(500).redirect("/static/error");
    }
}

async function set_date_to_show_orders(req,res){
    req.session.date_to_fetch_order_for = req.body.date_to_fetch_order_for;
    res.status(200).redirect("/static/orders");
}

module.exports = {
    handle_post_orders,
    set_date_to_show_orders,
}