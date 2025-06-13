const {db} = require("../models/foodopiaDB");

// async function fetch_all_possible_dates(req, res, next){
//     let sql_query = "SELECT DISTINCT DATE(order_at) as order_at FROM `order` ORDER BY DATE(order_at) DESC;";

//     db.query(sql_query, (err, result, fields)=>{
//         if(err)return res.status(500).json(err);
//         console.log("possible dates are");
//         console.log("==============");
//         console.log(result);
//         req.session.to_admin_page = {
//             ...req.session.to_admin_page,
//             all_possible_dates:result,
//         }
//         console.log("==============");
//         next();
//     })
// }

async function fetch_all_order_data (req, res, next){
    let date_in_query = ""; 
    let sql_query = "";
    if(req.session.date_to_fetch_order_for){
        date_in_query = req.session.date_to_fetch_order_for;
        sql_query = "SELECT o.*, u.name as customer_name FROM `order` o JOIN user u ON o.customer_id = u.user_id WHERE DATE(o.order_at) = ? ORDER BY o.order_at DESC;"
    }
    else{
        date_in_query = [];
        sql_query = "SELECT o.*, u.name as customer_name FROM `order` o JOIN user u ON o.customer_id = u.user_id WHERE DATE(o.order_at) = CURDATE() ORDER BY o.order_at DESC;"
        req.session.to_admin_page = {
            ...req.session.to_admin_page,
            page_date: new Date().toLocaleDateString('en-CA'),
        };
    }

    db.query(sql_query, [date_in_query],(err, result, fields)=>{
        req.session.to_admin_page = {
            ...req.session.to_admin_page,
            order_data_date_wise : result,
        };
        next();
    })
}

module.exports = {
    fetch_all_order_data,
    // fetch_all_possible_dates,
}