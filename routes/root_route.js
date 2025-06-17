const express = require("express");
const router = express.Router();

const {
    handle_render_root_page
} = require("../controllers/root_route");

router
    .route("/")
    .get(handle_render_root_page)

module.exports = router;