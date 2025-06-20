async function handle_render_root_page(req, res){
    return res.redirect("/static/profile");
}

module.exports = {
    handle_render_root_page,
}