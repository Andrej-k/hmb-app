const router = require('express').Router();
const User = require('../models/user');

const checkJWT = require('../middlewares/check-jwt');

router.route('/users')
    .get((req, res, next) => {
        User.find()
            .exec((err, users) => {
                if (users) {
                    res.json({
                        success: true,
                        message: "Users",
                        users: users
                    });
                }
            });
    })
    .post((req, res, next) => {
        let user = new User();
        user.label = req.body.label;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.OIB = req.body.OIB;
        user.gender = req.body.gender;
        user.placeOfResidence = req.body.placeOfResidence;
        user.save();
        res.json({
            success: true,
            message: 'Successfully Added the user'
        });
    });

module.exports = router;
