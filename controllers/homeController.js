class HomeController{
    static async showHome(req, res){
        res.render('home');
    }
}

module.exports = HomeController;