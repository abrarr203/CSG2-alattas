const registrationModel = require('../models/registrationModel');

class RegistrationController{
    // Get Request
    static async showRegisterForm(req, res){
        res.render('signup');
    }

    // Post Request
    static async createUsers(req, res){
        console.log(req.body);
        const {firstName, lastName, email, password, confirm} = req.body;
        const emailExists = await registrationModel.isEmailExists(email);

        if(emailExists){
            return res.render('signup', {message: 'Email already exists'});
        } 
        else if(password != confirm) {
            return res.render('signup', {message: 'Password not match'});
        }
        registrationModel.createUsers(firstName, lastName, email, password);
        console.log('User created successfully');
        return res.redirect('/login');
    }
}

module.exports = RegistrationController;