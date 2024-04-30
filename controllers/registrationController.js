const registrationModel = require('../models/registrationModel');

class RegistrationController{
    // Get Request
    static async showRegisterForm(req, res){
        res.render('signup', {message: ""});
    }

    // Post Request
    static async createUsers(req, res){
        let userData = {
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        };
        let isEmailExist = await registrationModel.isEmailExist(userData.email);
        if(isEmailExist){
            res.render('signup', {message: 'Email already exist'});
        }
        if(req.body.confirm !== userData.password){
            res.render('signup', {message: 'Password did not match'});
        }
        try{
            await registrationModel.createUsers(userData);
            return res.redirect('/login');
        } catch(error){
            return error;
        }
    }
}

module.exports = RegistrationController;