const SearchModel = require('../models/searchModel');
const podcastModel = require('../models/podcastModel');
class SearchController{

    static showSearchPage(req, res){
        res.render('search', {user: req.session.user})
    }

    static async search(req, res){
        let results = await SearchModel.search(req.query.search)

        res.render('search', {results: results, user: req.session.user})
    }

    static async result(req, res, next){
        let podcast = await podcastModel.getPodcastById(1);
        localStorage.setItem('podcast', JSON.stringify(podcast));
        let storedPodcast = JSON.parse(localStorage.getItem('podcast'));

        console.log(storedPodcast)
    }
}
module.exports = SearchController;