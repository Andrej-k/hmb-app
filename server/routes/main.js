const router = require('express').Router();
const User = require('../models/user');
var uniqid = require('uniqid');


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
        console.log(uniqid());
        user.id = uniqid();
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
            message: 'Successfully Added the user',
            user: user
        });
    });

router.put('/user/:id', (req, res, next) => {
    User.findById(req.body._id, function (error, user) {
        console.log(req.body._id);
        console.log(user);
        if (error || !user) {
            res.send({ error: error }, { status: 500 });
            console.log(error);
        } else {
            // now update it in MongoDB
            user.updateOne(
                { "_id": req.body._id },
                {
                    $set: {
                        label: req.body.label,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        OIB: req.body.OIB,
                        gender: req.body.gender,
                        entryDate: req.body.enrtyDate,
                        fatherName: req.body.fatherName,
                        birthDate: req.body.birthDate,
                        birthCity: req.body.birthCity,
                        birthMunicipality: req.body.birthMunicipality,
                        birthCountry: req.body.birthCountry,
                        placeOfResidence: req.body.placeOfResidence,
                        service: req.body.service,
                        remark: req.body.remark,
                        education: req.body.education
                    }
                })
                .then((obj) => {
                    res.json({
                        success: true,
                        message: 'Successfully Updated the user',
                        user: obj
                    });
                })
                .catch((err) => {
                    res.json(err);
                    console.log(error);
                });
        }
    });
});

router.get('/user/:id', (req, res, next) => {
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
