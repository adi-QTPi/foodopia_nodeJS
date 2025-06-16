const {db} = require("../models/foodopiaDB");

async function handle_get_item(req, res){
    let sql_query = `SELECT * FROM item;`;
    // let sql_query = `SELECT i.item_id, i.item_name, i.cook_time_min, i.price, i.display_pic, i.cat_id, c.cat_name, i.subcat FROM item i, category c WHERE i.cat_id = c.cat_id;`
    db.query(sql_query, (err, result, fields)=>{
        if(err)return res.status(500).json(err);
        console.log("handle_get_item reached");
        return res.status(200).json(result);
    })
}

async function handle_post_item(req, res){
    let {item_name, cat_id, subcat_id, price, cook_time_min, display_pic } = req.body;

    if(cat_id === subcat_id){
        subcat_id=null;
    }
    
    let sql_query = `INSERT INTO item (item_name, cat_id, cook_time_min, price, display_pic, subcat_id) VALUES (?, ?, ?, ?, ?, ?);`;

    db.query(sql_query, [item_name, cat_id, cook_time_min, price, display_pic, subcat_id], (err, result, fields)=>{
        if(err)return res.status(500).json(err);
        return res.status(200).redirect("/static/menu");
        // return res.status(200).json({
        //     msg:"done", 
        //     result
        // })
    })
}

module.exports = {
    handle_get_item,
    handle_post_item,
}