const db = require('../data/database');
const bcrypt = require('bcryptjs');

class RegistrationModel{

  static isEmailExist(email) {
    return new Promise((resolve, reject) => {
      try{
        db.query('SELECT email FROM users WHERE email = ?', [email], (error, result) => {
          if (error) {
            console.log(error);
            reject('Registration Model Error (isEmailExist): ', error);
            return;
          }
          resolve(result.length > 0); // Resolves with true if email exists, false otherwise
        });
      } catch(error){
        reject('Registration Model Error (isEmailExist): ', error);
      }
    });
  }

  static createUsers(user){
    return new Promise(async(resolve, reject) => {
        let salt = bcrypt.genSaltSync();
        let newUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: bcrypt.hashSync(user.password, salt),
          photo: user.photo,
          bio: user.bio
        }
        db.query("INSERT INTO users SET ?", newUser, (error) => {
          if(error){
            reject('Registration Model Error (createUsers): ',error);
          }
          resolve('Create a new user successful');
        });
    });
  };
}

module.exports = RegistrationModel;