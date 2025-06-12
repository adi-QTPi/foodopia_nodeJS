const {db} = require("../models/foodopiaDB");

async function handle_post_orders(req, res){
    const curr_user_id = req.x_user.user_id;
    console.log(req.body);
    console.log("user_id -> ",req.x_user.user_id);

    let total_price = 0;
    for(let items of req.body){
        total_price += items.price * items.quantity;
    }

    // let sql_query = "SELECT table_id FROM `table` WHERE is_empty = 1 LIMIT 1;"

    // db.query(sql_query, (err, result, fields)=>{
    //     if(err){
    //         return res.status(500).json({
    //             msg:"first one",
    //             err
    //         });
    //     }
    //     if(!result || result.length === 0){
    //         req.session.to_orders_page = {
    //             is_order_placed:false,
    //             message:"Table not available, please order later"
    //         }
    //         console.log("no table available");
    //     }
    //     else{
    //         // const table_id = Number(result[0].table_id);
    //         const table_id = req.table_id;
    //         const now = new Date();
    //         const order_at = now.toString();
    //         console.log("table_id -> ",table_id, "order_at -> ", order_at);

    //         //UPDATE `table` SET is_empty = 0 WHERE table_id = ?; 
    //         sql_query = "INSERT INTO `order` (order_at, table_no, customer_id, status, total_price) VALUES (?, ?, ?, ?, ?);";

    //         db.query(sql_query, [now, table_id, curr_user_id, "received", total_price], (err, result, fields)=>{
    //             if(err){
    //                 return res.status(500).json({
    //                     msg:"second one",
    //                     err
    //                 });
    //             }
    //             const order_id = Number(result.insertId);
    //             const req_body = req.body;
    //             sql_query = "INSERT INTO item_order (order_id, item_id, quantity, instruction, is_complete) VALUES (?, ?, ?, ?, ?);"
    //             res.status(200).json({
    //                 msg:"order to ban gya deal done"
    //             })
    //             for(let item of req_body){
    //                 db.query(sql_query, [order_id, item.item_id, item.quantity, item.instruction,0], (err,result,fields)=>{
    //                     if(err){
    //                         return res.status(500).json(err);
    //                     }
    //                     console.log("item id ", item.item_id, "added");
    //                 });
    //             }

    //             sql_query = "UPDATE `table` SET is_empty = 0 WHERE table_id = ?";
    //             db.query(sql_query, [table_id], (err,result, fields)=>{
    //                 if(err){
    //                     return res.status(500).json({
    //                         msg:"last one",
    //                         err
    //                     });
    //                 }
    //             });
    //         })
    //     }
    // })

    const table_id = req.session.table_id;
    // req.session.table_id = null;
    // const table_id = 1;
    const now = new Date();
    const order_at = now.toString();
    console.log("table_id -> ",table_id, "order_at -> ", order_at);

    //UPDATE `table` SET is_empty = 0 WHERE table_id = ?; 
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

module.exports = {
    handle_post_orders,
}