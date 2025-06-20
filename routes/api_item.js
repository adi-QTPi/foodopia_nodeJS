const express = require("express");
const router = express.Router();

const { 
    check_for_entries_in_array 
} = require("../middleware/general");

const {
    auth_check_if_logged_in,
    auth_restrict_to
} = require("../middleware/authorise");

const {
    handle_get_item,
    handle_post_item,
    handle_post_delete_item
} = require("../controllers/api_item");

router.use(
    auth_check_if_logged_in, 
    auth_restrict_to(["admin"])
)

router
    .route("/")
    .get(handle_get_item)
    .post(
        check_for_entries_in_array(["item_name", "price", "cat_id"]),
        handle_post_item
    )

router      
    .route("/delete")
    .post(
        check_for_entries_in_array(["item_id"]),
        handle_post_delete_item
    )

module.exports = router;