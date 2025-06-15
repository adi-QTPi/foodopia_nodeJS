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
        res.status(200).redirect("/static/orders")
    })
}

module.exports = {
    handle_post_pay,
}