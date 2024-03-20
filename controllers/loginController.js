const loginModel = require('../models/loginModel');
let isAuth = false;

class LoginController{

    static async showLoginPage(req, res){
        res.render('login');
    }

    static async login(req, res){
        const {email, password} = req.body;
        const login = await loginModel.login(email, password);

        if(login){
            isAuth = true;
            console.log('User login successfully');
            return res.redirect('home');
        }
        return res.render('login', {message: 'Email or Passwords not correct'});
    }

    static isLoggedIn(req, res, next){
        if(!isAuth){
            return res.redirect('/login');
        }
        next();
    }

    static isLoggedOut(req, res, next){
        if(isAuth){
            isAuth = false;
            return res.redirect('/login');
        }
        next();
    }
}

module.exports = LoginController;