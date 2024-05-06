const podcastModel = require('../models/podcastModel');
const UserModel = require('../models/userModel')
const {imageReader, audioReader} = require('../js/convertPhoto.js')

class HomeController{
    static async showHome(req, res){
        try {
            const user = req.session.user;
            const podcasts = await podcastModel.getAllPodcasts();
            const mostPopularPodcast = await podcastModel.mostPopularPodcast();
            const numberOfPodcasts = await podcastModel.getNumberOfPodcasts();
            const numberOfUsers = await UserModel.getNumberOfUsers();
            res.render('home', {
            user: user,
            podcasts:podcasts,
            mostPopularPodcast: mostPopularPodcast,
            numberOfPodcasts: numberOfPodcasts,
            numberOfUsers: numberOfUsers
            });
            } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while retrieving the number of podcasts.');
            }      
    }
}

module.exports = HomeController;