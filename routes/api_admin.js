const express = require("express");
const router = express.Router();

const { 
    handle_post_orders_by_date,
} = require("../controllers/api_admin");

const { 
    check_new_user_detail_entry_signup, 
    hash_password,
} = require("../middleware/api_user");

const {
    check_for_entries_in_array
} = require("../middleware/general")

const { 
    admin_handle_post_create_new_user
} = require("../controllers/api_user");

router  
    .route("/orders_by_date")
    .post(handle_post_orders_by_date)

router
    .route("/create_new")
    .post(
        check_for_entries_in_array(["user_name", "name", "password", "role"]),
        hash_password,
        admin_handle_post_create_new_user
    )

module.exports = router;