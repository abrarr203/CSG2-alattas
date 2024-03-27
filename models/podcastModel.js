const db = require('../data/database');

class PodcastModel {
    static getAllPodcasts(){
        return new Promise((resolve, rej) => {
            try{
                db.query('SELECT podcasts.name, podcasts.photo, podcasts.audio ,users.firstName, users.lastName FROM podcasts JOIN users ON podcasts.userId = users.userId', 
                (error, result) => {
                    if (error){
                        rej('Podcast Model Error (getAllPodcasts): ', error);
                    } else {
                        resolve(result);
                    }
                });
            } catch(error){
                rej('Podcast Model Error: ', error);
            }
        });
    }
}

module.exports = PodcastModel;