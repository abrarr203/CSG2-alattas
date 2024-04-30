const { imageReader, audioReader} = require('../js/convertPhoto');
const UserModel = require('../models/userModel');

class UserController{

    static async showProfilePage(req, res){
        const userId = req.params.userId;
        const user = await UserModel.getUserById(userId);
        if(user.userId != req.session.user.userId) {
            if(user.photo){
                user.photo = imageReader(user.photo);
            }
            res.render('usersProfile', {
                user: user,
                currentUser: req.session.user
            })
        } else {
            res.render('profile', {
                user: req.session.user
            });
        }
    }

    static async updateProfile(req, res){
        let updatedData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.session.user.email,
            password: req.body.password,
            photo: req.file.originalname,
            bio: req.body.bio
        }
        try{
            await UserModel.updateUserData(updatedData, req.session.user.email);
            req.session.user = { ...req.session.user, ...updatedData };

            req.session.user.photo = imageReader(req.session.user.photo);
            return res.redirect('/profile/'+ req.session.user.userId);
        } catch(err){
            return err;
        }
    }

}

module.exports = UserController;