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

        let newPodcast = {
            name:req.body.name,
            photo:req.files["photo"][0].originalname,
            podcast: req.files["podcast"][0].originalname,
            userId:user
        };
        
        try{
            await podcastModel.createPodcast(newPodcast);            
            return res.redirect('/profile/'+ req.session.user.userId);
        } catch(error){
            return error;
        }
    }
    static async getPodcastById(req,res){
        const podcastId = req.params.podcastId;
        try {
            const podcastData = await podcastModel.getAllPodcasts;
            res.json(podcastData)
          } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve the podcast.' });
          }
    }

}

module.exports = PodcastController;