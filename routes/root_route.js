const express = require("express");
const router = express.Router();

const {
    handle_render_root_page
} = require("../controllers/root_route");
const { 
    auth_check_if_logged_in 
} = require("../middleware/authorise");

router
    .route("/")
    .get(
        auth_check_if_logged_in,
        handle_render_root_page
    )

module.exports = router;