const express = require("express");
const router = express.Router();

const { 
    handle_post_orders 
} = require("../controllers/api_orders");

const { 
    auth_check_if_logged_in 
} = require("../middleware/authorise");

router.use(auth_check_if_logged_in);
router
    .route("/")
    .post(handle_post_orders)

module.exports = router;