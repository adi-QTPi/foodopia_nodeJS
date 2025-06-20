const {db} = require("../models/foodopiaDB");

async function handle_get_category(req, res){
    let sql_query = `SELECT * FROM category;`;

    db.query(sql_query, (err,result,fields)=>{
        if(err)return res.status(500).json(err);
        console.log("get_category reached");
        return res.json(result);
    })
}

async function handle_post_category(req, res){
    const {cat_name, cat_description} = req.body;
    let sql_query = `INSERT INTO category (cat_name, cat_description) VALUES (?,?)`;
    db.query(sql_query, [cat_name, cat_description], (err, result, fields)=>{
        if(err){
            req.session.to_menu_page = {
                error:"Some error occured, please try again later"
            }
            return res.redirect("/static/menu");
        }
        req.session.to_menu_page = {
            message:"New Category added !"
        }
        return res.status(200).redirect("/static/menu");
    });
}

module.exports = {
    handle_get_category,
    handle_post_category,
}