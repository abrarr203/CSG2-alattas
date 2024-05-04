const e = require('express');
const db = require('../data/database');

class PodcastModel {
    static getAllPodcasts(){
        return new Promise((resolve, rej) => {
            try{
                db.query('SELECT podcastId, podcasts.name, podcasts.photo, podcasts.audio ,users.firstName, users.lastName FROM podcasts JOIN users ON podcasts.userId = users.userId', 
                (error, result) => {
                    if (error){
                        rej('Podcast Model Error (getAllPodcasts): ', error);
                    } else {
                        resolve(result);
                    }
                });
            } catch(error){
                rej('Podcast Model Error: ' + error);
            }
        });
    }

    static getNumberOfPodcasts() {
        return new Promise((resolve, reject) => {
            try {
                db.query('SELECT COUNT(*) as numberOfPodcasts FROM podcasts', (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results[0].numberOfPodcasts);
                    }
                });
            } catch (error) {
                reject('Podcast Model Error: ' + error);
            }
        });
    }
        

    static mostPopularPodcast(){
        return new Promise((resolve, rej) => {
            try{
                db.query(`SELECT 
                p.podcastId, p.name, p.photo, p.audio, u.firstName, u.lastName
                FROM podcasts AS p
                JOIN users AS u ON p.userId = u.userId
                JOIN likes AS l ON p.podcastId = l.podcastId
                GROUP BY p.podcastId, p.name, p.photo, p.audio, u.firstName, u.lastName
                ORDER BY COUNT(l.likeId) DESC LIMIT 1;`, 
                (error, result) => {
                    if(error){
                        rej('Podcast Model Error (mostPopularPodcast):' + error);
                        throw error;
                    } else {
                        let podcast = result[0];
                        resolve(podcast)
                    }
                });
            } catch(error){
                rej('Podcast Model Error: ' + error);
            }
        });
    }

    static addLike(userId, podcastId){
        return new Promise((resolve, rej) => {
            try{
                let like ={
                    userId : userId,
                    podcastId: podcastId
                }
                db.query('INSERT INTO likes SET ?', like, 
                (error, result) => {
                    if(error){
                        rej(error);
                    } else {
                        resolve('Add Like');
                    }
                });
            } catch(error){
                rej(error);
            }
        });
    }

    static createPodcast(post){
        return new Promise(async(resolve, reject) => {
            try{
                let newpodcast = {
                    name: post.name,
                    photo: post.photo,
                    audio: post.podcast,
                    userId:post.userId
                  }
                  db.query("INSERT INTO podcasts SET ?", newpodcast, (error,result) => {
                    if(error){
                      throw('podcast Model Error (createPodcast): ',error);
                    }
                    resolve('Create a new Podcast successful');
                  });
            } 
            catch(error){

                throw error;
            } 
        });
    };

    static async getPodcastById(podcastId){
        return new Promise((resolve, rej)=>{
            db.query('SELECT * FROM podcasts WHERE podcastId=?', podcastId, 
            (error, result) => {
                if(error){
                    rej(error);
                } else {
                    resolve(result[0]);
                }
            });
        });
    };
}

module.exports = PodcastModel;