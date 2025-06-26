const {db} = require("../models/foodopiaDB");

async function handle_post_mark_item_complete(req, res){
    const order_id = Number(req.body.order_id);
    const item_id = Number(req.body.item_id);
    const is_complete = req.body.is_complete;
    const cook_id = req.x_user.user_id;

    let sql_query = "UPDATE item_order SET is_complete = ?, cook_id = ? WHERE order_id = ? AND item_id = ?;";

    db.query(sql_query,[is_complete, cook_id, order_id, item_id], (err, result, fields)=>{
        if(err){
            req.session.to_error_page = {
                error : JSON.stringify(err),
            }
            return res.redirect("/static/error");
        }
        res.status(200).redirect("/static/cook");
    })
}

module.exports = {
    handle_post_mark_item_complete,
}