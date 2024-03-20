const db = require('../data/database');

class LoginModel{
    static async login(email, password){
        return new Promise((resolve, rej) => {
            db.query('SELECT * FROM users WHERE email = ? && password = ?', [email, password], (error, result) => {
                if(error){
                  rej(error);
                }
                if(result.length === 1){
                    resolve(true);
                }
                resolve(false); 
            });
        });
    }
}

module.exports = LoginModel;