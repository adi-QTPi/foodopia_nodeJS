const express = require("express");
const router = express.Router();

const {
    handle_post_pay,
} = require("../controllers/api_pay");

router  
    .route("/")
    .post(handle_post_pay)

module.exports = router;