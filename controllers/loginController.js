const loginModel = require('../models/loginModel');
const {userData} = require('../models/userModel');
let isAuth = false;

class LoginController{

    static async showLoginPage(req, res){
        res.render('login', {message: ""});
    }

    static async login(req, res){
        try{
            const {email, password} = req.body;
            const login = await loginModel.login(email, password);
            if(login){
                isAuth = true;
                const user = await userData(email);
                req.session.user = user;
                console.log('User login successfully');
                return res.redirect('home');
            }
        } catch (error) {
            return res.render('login', {message: 'Email or Passwords not correct'});v
        }
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
            console.log('User logged out successfully');
        }
        next();
    }

    static logout(req, res) {
        req.session.destroy((error) => {
            if(error){
                console.log(error);
            }
            return res.redirect('/login');
        });
    }
}

module.exports = LoginController;