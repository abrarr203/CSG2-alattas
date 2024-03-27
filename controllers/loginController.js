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
                isAuth = true; // set user as authenticated after successful login
                const user = await userData(email);
                req.session.user = user; //  save logged in user data to session 
                console.log('User login successfully');
                return res.redirect('home');
            }
            return res.render('login', {message: 'Email or Passwords not correct'});
        } catch (error) {
            console.log(error);
        }
    }

    static isLoggedIn(req, res, next){ //  middleware function for checking authentication of the user
        if(!isAuth){
            return res.redirect('/login');
        }
        next();
    }

    static isLoggedOut(req, res, next){ //   middleware function for checking unauthenticated
        if(isAuth){
            isAuth = false; //  reset the authentication status to false when logout
            console.log('User logged out successfully');
        }
        next();
    }

    static logout(req, res) {
        req.session.destroy((error) => { //  destroy session data 
            if(error){
                console.log(error);
            }
            return res.redirect('/login');
        });
    }
}

module.exports = LoginController;