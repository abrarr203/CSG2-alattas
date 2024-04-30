const podcastModel = require('../models/podcastModel');

class HomeController{
    static async showHome(req, res){
        const user = req.session.user;
        const podcasts = await podcastModel.getAllPodcasts();
        const mostPopularPodcast = await podcastModel.mostPopularPodcast();

        let convertUserPhoto, binaryUserPhoto;
        if (req.session.user.photo){
            binaryUserPhoto = req.session.user.photo;
            convertUserPhoto = Buffer.from(binaryUserPhoto).toString('base64');
            req.session.user.photo = convertUserPhoto;
        }

        const binaryMostPopularPhoto = mostPopularPodcast.photo;
        const convertMostPopularPhoto = Buffer.from(binaryMostPopularPhoto).toString('base64');
        
        const binaryMostPopularAudio = mostPopularPodcast.audio;
        const convertMostPopularAudio = Buffer.from(binaryMostPopularAudio).toString('base64');
        
        mostPopularPodcast.photo = convertMostPopularPhoto;
        mostPopularPodcast.audio = convertMostPopularAudio;

        const updatedPodcasts = [];  //  Array to store the modified data of each podcast
        for (const podcast of podcasts) {
            let convertPodcastPhoto, binaryPodcastPhoto;
            let convertPodcastAudio, binaryPodcastAudio;
            // convert image
            if (podcast.photo) {
                binaryPodcastPhoto = podcast.photo;
                convertPodcastPhoto = Buffer.from(binaryPodcastPhoto).toString('base64');
            }
            // convert audio
            binaryPodcastAudio = podcast.audio;
            convertPodcastAudio = Buffer.from(binaryPodcastAudio).toString('base64');
            //  adding base64 images and audios to the array
            const updatedPodcast = { ...podcast, photo: convertPodcastPhoto, audio: convertPodcastAudio};
            updatedPodcasts.push(updatedPodcast);
        }
        res.render('home', {
            user: user, 
            podcasts: updatedPodcasts,
            mostPopularPodcast: mostPopularPodcast
        });        
    }
}

module.exports = HomeController;