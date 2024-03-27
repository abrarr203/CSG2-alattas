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
        // ماكو تحقق من الباسوورد اذا يتطابق او لا 
        try{
            await registrationModel.createUsers(userData);
            return res.redirect('/login');
        } catch(error){
            console.log(error);
            res.render('signup', {message: 'Email already exist'});
        }
    }
}

module.exports = RegistrationController;