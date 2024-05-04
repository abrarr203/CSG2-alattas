const SearchModel = require('../models/searchModel');

class SearchController{

    static showSearchPage(req, res){
        res.render('search', {user: req.session.user})
    }

    static async search(req, res){
        let results = await SearchModel.search(req.query.search)

        res.render('search', {results: results, user: req.session.user})
    }
}
module.exports = SearchController;