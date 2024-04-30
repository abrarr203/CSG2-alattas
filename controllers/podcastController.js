const podcastModel = require('../models/podcastModel');

class PodcastController{

    static async addLike(req,res){
        const userId = req.params.userId;
        const podcastId = req.params.podcastId;

        await podcastModel.addLike(userId, podcastId);

        res.redirect('/home')
    }

    static async createPodcast(req, res){
        const user=req.session.user.userId;

        let newpodcast = {
            name:req.body.name,
            photo:req.files["photo"][0].originalname,
            podcast: req.files["podcast"][0].originalname,
            userId:user
        };
        
        try{
            await podcastModel.createPodcast(newpodcast);            
            return res.redirect('/profile/'+ req.session.user.userId);
        } catch(error){
            return error;
        }
    }
}

module.exports = PodcastController;