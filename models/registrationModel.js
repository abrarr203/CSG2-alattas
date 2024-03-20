const db = require('../data/database');

class RegistrationModel{

  static isEmailExists(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT email FROM users WHERE email = ?', [email], (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
          return;
        }
        resolve(result.length > 0); // Resolves with true if email exists, false otherwise
      });
    });
  }

  static createUsers(firstName, lastName, email, password){
    db.query('INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password], (error)=>{
      if(error){
        console.log(error);
        return;
      } else {
        return;
      }
    });
  }
}

module.exports = RegistrationModel;