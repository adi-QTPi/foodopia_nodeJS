const {db} = require("../models/foodopiaDB");

async function handle_render_cook_page(req, res){
    let sql_query = "SELECT io.order_id, io.item_id, i.item_name, io.quantity, io.instruction, io.is_complete, io.cook_id, o.table_no, o.order_at FROM item_order io JOIN item i ON io.item_id = i.item_id JOIN `order` o ON io.order_id = o.order_id ORDER BY io.order_id DESC;";
    db.query(sql_query, (err, result, cook)=>{
        let to_cook_page = {
            x_user:req.x_user,
            item_to_cook:result,
        }
        res.status(200).render("cook", {to_cook_page});
    })
}

module.exports = {
    handle_render_cook_page,
}