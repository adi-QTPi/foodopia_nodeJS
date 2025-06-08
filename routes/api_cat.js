const express = require("express");
const router = express.Router();

const {
    auth_check_if_logged_in,
    auth_restrict_to,
} = require("../middleware/authorise");

const {
    handle_get_category,
    handle_post_category,
} = require("../controllers/api_cat");

router
    .route("/")
    .get(handle_get_category)
    .post(
        auth_check_if_logged_in,
        auth_restrict_to(["admin"]),
        handle_post_category
    )

module.exports = router;