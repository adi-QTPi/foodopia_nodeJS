const express = require("express");
const router = express.Router();

const {
    handle_render_cook_page,
} = require("../controllers/static_cook");

const { 
    auth_check_if_logged_in, auth_restrict_to 
} = require("../middleware/authorise");

const {
    update_order_status
} = require("../middleware/static_cook")

router.use(auth_check_if_logged_in, auth_restrict_to(["cook"]));
router  
    .route("/")
    .get(
        update_order_status,
        handle_render_cook_page
    )

module.exports = router;