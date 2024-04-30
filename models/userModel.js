const db = require('../data/database');
const bcrypt = require('bcryptjs');
const path = require('path');
class UserModel{

    static getNumberOfUsers(){
        return new Promise((resolve, rej) => {
            try{
                db.query('SELECT COUNT(*) AS numberOfUsers FROM users', (error, result) => {
                    if(error){
                        rej(error)
                    } else {
                        let number = result[0].numberOfUsers;
                        resolve(number)
                    }
                })
            } catch(error){
                rej(error);
            }
        })
    }

    static updateUserData(user, email){
        return new Promise((resolve, rej) => {
            try{
                let salt = bcrypt.genSaltSync();
                let updatedData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: bcrypt.hashSync(user.password, salt),
                    photo: user.photo,
                    bio: user.bio
                }
                db.query('UPDATE users SET ? WHERE email=?', [updatedData, email], (error, result) => {
                    if(error){
                        throw error;
                    } else {
                        resolve(result);
                    }
                })
            } catch(error){
                throw error;
            }
        })
    }

    static userData(email){
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
    }

    static getUserById(Id){
        return new Promise((resolve, rej) => {
            try{
                db.query('SELECT * FROM users WHERE userId=?', [Id], 
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
    }
}

module.exports = UserModel;