const {db} = require("../models/foodopiaDB");

async function handle_get_item(req, res){
    // let sql_query = `SELECT * FROM item;`;
    let sql_query = `SELECT i.item_id, i.item_name, i.cook_time, i.price, i.display_pic, i.cat_id, c.cat_name, i.subcat FROM item i, category c WHERE i.cat_id = c.cat_id;`

    db.query(sql_query, (err, result, fields)=>{
        if(err)return res.status(500).json(err);
        console.log("handle_get_item reached");
        return res.status(200).json(result);
    })
}

async function handle_post_item(req, res){
    const {item_name, cat_id, subcat, price, cook_time, display_pic } = req.body;
    
    let sql_query = `INSERT INTO item (item_name, cat_id, cook_time, price, display_pic, subcat) VALUES (?, ?, ?, ?, ?, ?);`;

    db.query(sql_query, [item_name, cat_id, cook_time, price, display_pic, subcat], (err, result, fields)=>{
        if(err)return res.status(500).json(err);
        console.log("handle_post_item reached");
        return res.status(200).json({
            msg:"done", 
            result
        })
    })
}

module.exports = {
    handle_get_item,
    handle_post_item,
}