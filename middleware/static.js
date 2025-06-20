const {db} = require("../models/foodopiaDB");

async function fetch_order_data_by_id(req, res, next){
    const order_id = req.params.id;

    let sql_query = "SELECT o.order_id, o.order_at, o.table_no, o.customer_id, u.name AS customer_name, o.status AS order_status, o.total_price, io.item_id, i.item_name, i.price, io.quantity, io.instruction, io.is_complete, io.cook_id FROM `order` o INNER JOIN item_order io ON o.order_id = io.order_id INNER JOIN item i ON io.item_id = i.item_id INNER JOIN user u ON o.customer_id = u.user_id WHERE o.order_id = ?;";

    db.query(sql_query, [order_id], (err, result, fields)=>{
        req.session.to_order_by_id_page = {
            ...req.session.to_order_by_id_page,
            order_data: result,
        }
        next();
    });
}

async function check_if_date_given(req,res,next){
    next();
}

module.exports = {
    fetch_order_data_by_id,
    check_if_date_given,
}