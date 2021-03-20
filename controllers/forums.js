// Functions for server requests
function index(req, res) {
    res.render('forums/index');
}

module.exports = {
    index
}