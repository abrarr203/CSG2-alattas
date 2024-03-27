const db = require('../data/database');

let userData = (email) => {
    return new Promise((resolve, rej) => {
        try{
            db.query('SELECT * FROM users WHERE email=?', [email], 
            (error, result) => {
                if(error){
                    rej(error);
                } else {
                    let user = result[0];
                    console.log(user);
                    resolve(user);
                }
            });
        } catch(err){
            rej(err);
        }
    });
};

module.exports = {
    userData: userData,
}