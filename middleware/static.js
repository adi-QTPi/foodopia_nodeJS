const {db} = require("../models/foodopiaDB");

async function fetch_order_data_by_id(req, res, next){
    console.log("fetch order middleware touched");
    console.log("order #", req.params.id);
    next();
}

module.exports = {
    fetch_order_data_by_id,
}