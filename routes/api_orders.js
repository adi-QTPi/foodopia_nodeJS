const express = require("express");
const router = express.Router();

const { 
    handle_post_orders 
} = require("../controllers/api_orders");

const { 
    auth_check_if_logged_in 
} = require("../middleware/authorise");

const {
    assign_table_for_new_order
} = require("../middleware/api_orders");

router.use(auth_check_if_logged_in);
router
    .route("/")
    .post(
        assign_table_for_new_order,
        handle_post_orders
    )

module.exports = router;