const db = require('../data/database');

class SearchModel{

    static search(text){
        // return new Promise((resolve, rej)=>{
        //     db.query(`SELECT * FROM users WHERE CONCAT(users.firstName, ' ', users.lastName) LIKE ?
        //     UNION
        //     SELECT * , null as add FROM podcasts WHERE podcasts.name LIKE ?`, [text, text], (error, result) =>{
        //         if(error) throw error;
        //         console.log(result);
        //         resolve(result);
        //     });
        // });
            return new Promise((resolve, reject) => {
              const searchTerm = `%${text}%`;
          
              const query = `
                SELECT 'user' AS type, users.userId, CONCAT(users.firstName, ' ', users.lastName) AS name, users.photo, NULL AS additionalColumn
                FROM users
                WHERE CONCAT(users.firstName, ' ', users.lastName) LIKE ?
                UNION
                SELECT 'podcast' AS type, podcasts.podcastId, podcasts.name, podcasts.photo, NULL AS additionalColumn
                FROM podcasts
                WHERE podcasts.name LIKE ?
              `;
          
              db.query(query, [searchTerm, searchTerm], (error, result) => {
                if (error) {
                  console.error('Error executing query:', error);
                  reject(error);
                  return;
                }
                resolve(result);
              });
            });
          
        
    }
}

module.exports = SearchModel;