const podcastModel = require('../models/podcastModel');

class PodcastController{

    static async addLike(req,res){
        const userId = req.params.userId;
        const podcastId = req.params.podcastId;

        await podcastModel.addLike(userId, podcastId);

        res.redirect('/home')
    }
}

module.exports = PodcastController;