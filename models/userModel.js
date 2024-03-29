const db = require('../data/database');

let userData = (email) => {
    return new Promise((resolve, rej) => {
        try{
            db.query('SELECT * FROM users WHERE email=?', [email], 
            (error, result) => {
                if(error){
                    rej( 'User Model Error (userData): ', error);
                } else {
                    let user = result[0];
                    resolve(user);
                }
            });
        } catch(err){
            rej('User Model Error: ', err);
        }
    });
};

module.exports = {
    userData: userData,
}