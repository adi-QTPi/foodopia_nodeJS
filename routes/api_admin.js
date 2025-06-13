const express = require("express");
const router = express.Router();

const { 
    handle_post_orders_by_date,
} = require("../controllers/api_admin");

router  
    .route("/orders_by_date")
    .post(handle_post_orders_by_date)

module.exports = router;