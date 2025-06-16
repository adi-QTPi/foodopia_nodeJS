const {db} = require("../models/foodopiaDB");

async function handle_post_pay(req, res){
    const order_id = Number(req.body.order_id);
    const total_amount = Number(req.body.total_amount);
    const customer_review = req.body.customer_review;

    let sql_query = "INSERT INTO paid_orders (order_id, customer_review, total_amount) VALUES (?, ?, ?); UPDATE `order` SET status = 'paid' WHERE order_id = ?;";
    db.query(sql_query, [order_id, customer_review, total_amount, order_id], (err, result, fields)=>{
        if(err){
            return res.status(500).json(err);
        }
        sql_query = "UPDATE `table` SET is_empty = 1 WHERE table_id IN (SELECT DISTINCT table_no FROM `order` o1 WHERE table_no IS NOT NULL AND NOT EXISTS (SELECT 1 FROM `order` o2 WHERE o2.table_no = o1.table_no AND o2.status != 'paid'));"

        db.query(sql_query, (err, result, fields)=>{
            if(err){
                req.session.to_error_page = {
                    error:JSON.stringify(err)
                }
                return res.status(500).redirect("/static/error");
            }
            return res.status(200).redirect("/static/orders")
        })
    })
}

module.exports = {
    handle_post_pay,
}