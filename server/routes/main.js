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
        user.entryDate = req.body.enrtyDate;
        user.fatherName = req.body.fatherName;
        user.birthDate = req.body.birthDate;
        user.birthCity = req.body.birthCity;
        user.birthMunicipality = req.body.birthMunicipality;
        user.birthCountry = req.body.birthCountry;
        user.placeOfResidence = req.body.placeOfResidence;
        user.service = req.body.service;
        user.remark = req.body.remark;
        user.education = req.body.education;
        user.save();
        res.json({
            success: true,
            message: 'Successfully Added the user'
        });
    });

router.get('/users/:id', (req, res, next) => {
    User.findById({ _id: req.params.id })
        .exec((err, user) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'User is not found'
                });
            } else {
                if (user) {
                    res.json({
                        success: true,
                        user: user
                    });
                }
            }
        });
});

module.exports = router;
