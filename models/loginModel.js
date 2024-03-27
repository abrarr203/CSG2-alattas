const db = require('../data/database');
const bcrypt = require('bcryptjs');

class LoginModel{

    static findByEmail(email){
        return new Promise((resolve, rej) => {
            try{
                db.query('SELECT * FROM users WHERE email=?', [email], 
                (error, result) => {
                    if(error){
                        rej(error);
                    } else {
                        let user = result[0];
                        resolve(user);
                    }
                });
            } catch(err){
                rej(err);
            }
        });
    }

    static comparePassword(password, hashedPassword){
        return new Promise(async (resolve, rej) =>{
            try{
                let isMatch = await bcrypt.compare(password, hashedPassword);
                if(isMatch){
                    resolve(true);
                }
                resolve(`The password that you've entered is incorrect`);
            } catch(error){
                rej(error);
            }
        });
    };

    static login(email, password){
        return new Promise(async (resolve, rej) => {
            try{
                let user = await this.findByEmail(email);
                if(user){
                    let isMatch = await bcrypt.compare(password, user.password);
                    if(isMatch){
                        resolve(true);
                    } else {
                        let message = `The password that you've entered is incorrect`;
                        rej(message);
                    }
                } else {
                    let message = `This user email "${email}" doesn't exist`;
                    rej(message);
                }
            } catch(error){
                rej(error);
            }
        });
    };
}

module.exports = LoginModel;