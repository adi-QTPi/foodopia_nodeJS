const {db} = require("../models/foodopiaDB");
const mysql = require('mysql2/promise');

async function handle_post_pay(req, res){
    const order_id = Number(req.body.order_id);
    const total_amount = Number(req.body.total_amount);
    const customer_review = req.body.customer_review;

    try{
        let sql_query = "INSERT INTO paid_orders (order_id, customer_review, total_amount) VALUES (?, ?, ?);";
        await db.execute (sql_query, [order_id, customer_review, total_amount]);

        sql_query = "UPDATE `order` SET status = 'paid' WHERE order_id = ?;"
        await db.execute(sql_query, [order_id]);

        sql_query = "UPDATE `table` SET is_empty = 1 WHERE table_id IN (SELECT DISTINCT table_no FROM `order` o1 WHERE table_no IS NOT NULL AND NOT EXISTS (SELECT 1 FROM `order` o2 WHERE o2.table_no = o1.table_no AND o2.status != 'paid'));";
        await db.execute(sql_query);

        return res.status(200).redirect("/static/orders");
    }
    catch (err){
        req.session.to_error_page = {
            error: JSON.stringify(err)
        }
        return res.redirect("/static/error");
    }
}

module.exports = {
    handle_post_pay,
}