const {db} = require("../models/foodopiaDB");

async function handle_get_item(req, res){
    let sql_query = `SELECT * FROM item;`;

    db.query(sql_query, (err, result, fields)=>{
        if(err){
            req.session.to_error_page = {
                error : JSON.stringify(err),
            }
            return res.redirect("/static/error");
        }
        return res.status(200).json(result);
    })
}

async function handle_post_item(req, res){
    let {item_name, cat_id, subcat_id, price, cook_time_min } = req.body;
    const display_pic = req.files?.display_pic?.[0]?.path.replace('public/', '') || null;

    if(cat_id === subcat_id){
        subcat_id=null;
    }
    
    let sql_query = `INSERT INTO item (item_name, cat_id, cook_time_min, price, display_pic, subcat_id) VALUES (?, ?, ?, ?, ?, ?);`;

    db.query(sql_query, [item_name, cat_id, cook_time_min, price, display_pic, subcat_id], (err, result, fields)=>{
        if(err){
            req.session.to_menu_page = {
                error: "Some error occured, please try again later"
            }
            return res.redirect("/static/menu");
        }
        req.session.to_menu_page = {
            message:"New Item added !"
        }
        return res.status(200).redirect("/static/menu");
    })
}

async function handle_post_delete_item(req,res){
    const {item_id} = req.body;
    let sql_query = "UPDATE item SET is_available = 0 WHERE item_id = ?;"
    db.query(sql_query, [item_id], (err, result, fields)=>{
        if(err){
            req.session.to_error_page = {
                error: JSON.stringify(err)
            }
            return res.redirect("/static/error");
        }
        req.session.to_menu_page = {
            message:"Item Deleted Successfully !"
        }
        return res.status(200).redirect("/static/menu");
    })
}

module.exports = {
    handle_get_item,
    handle_post_item,
    handle_post_delete_item,
}