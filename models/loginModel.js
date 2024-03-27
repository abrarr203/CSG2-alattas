const db = require('../data/database');
const {userData} = require('../models/userModel');
const bcrypt = require('bcryptjs');

class LoginModel{

    static comparePassword(password, hashedPassword){
        return new Promise(async (resolve, rej) =>{
            try{
                let isMatch = await bcrypt.compare(password, hashedPassword);
                if(isMatch){
                    resolve(true);
                }
                resolve(false);
            } catch(error){
                rej('Login Model Error (comparePassword): ', error);
            }
        });
    };

    static login(email, password){
        return new Promise(async (resolve, rej) => {
            try{
                let user = await userData(email);
                console.log(user);
                if(user){
                    let isMatch = await bcrypt.compare(password, user.password);
                    if(isMatch){
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            } catch(error){
                rej('Login Model Error: ',error);
                throw error;
            }
        });
    };
}

module.exports = LoginModel;