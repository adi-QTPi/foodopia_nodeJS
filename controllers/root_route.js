async function handle_render_root_page(req, res){
    res.redirect("/static/login");
}

module.exports = {
    handle_render_root_page,
}