async function handle_render_root_page(req, res){
    console.log("handle render root page", req.body);
    // if(req.x_user){
    //     return res.redirect("/static/profile");
    // }
    return res.redirect("/static/profile");
}

module.exports = {
    handle_render_root_page,
}