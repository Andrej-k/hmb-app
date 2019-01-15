const router = require('express').Router();
const User = require('../models/user');
var uniqid = require('uniqid');


const checkJWT = require('../middlewares/check-jwt');

router.route('/users')
    .get(checkJWT, (req, res, next) => {
        User.find()
            .exec((err, users) => {
                if (err) res.json({
                    error: err
                });
                if (users) {
                    res.json({
                        success: true,
                        message: "Users",
                        users: users
                    });
                }
            });
    })
    .post(checkJWT, (req, res, next) => {
        let user = new User();
        console.log(uniqid());
        user.id = uniqid();
        user.label = req.body.label;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.oib = req.body.oib;
        user.gender = req.body.gender;
        user.fatherName = req.body.fatherName;
        user.birthDate = req.body.birthDate;
        user.birthCity = req.body.birthCity;
        user.birthMunicipality = req.body.birthMunicipality;
        user.birthCountry = req.body.birthCountry;
        user.placeOfResidence = req.body.placeOfResidence;
        user.service = req.body.service;
        user.remark = req.body.remark;
        user.education = req.body.education;
        user.noteDate = req.body.noteDate;
        user.noteDescription = req.body.noteDescription;
        user.noteEmployee = req.body.noteEmployee;
        user.anamnesisDate = req.body.anamnesisDate;
        user.anamnesisDescription = req.body.anamnesisDescription;
        user.save();
        res.json({
            success: true,
            message: 'Successfully Added the user',
            user: user
        });
    });

router.put('/user/:id', checkJWT, (req, res, next) => {
    console.log(req.body.id);
    User.findOneAndUpdate({ id: req.body.id },
        {
            label: req.body.label,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            oib: req.body.oib,
            gender: req.body.gender,
            fatherName: req.body.fatherName,
            birthDate: req.body.birthDate,
            birthCity: req.body.birthCity,
            birthMunicipality: req.body.birthMunicipality,
            birthCountry: req.body.birthCountry,
            placeOfResidence: req.body.placeOfResidence,
            service: req.body.service,
            remark: req.body.remark,
            education: req.body.education,
            noteDate: req.body.noteDate,
            noteDescription: req.body.noteDescription,
            noteEmployee: req.body.noteEmployee,
            anamnesisDate: req.body.anamnesisDate,
            anamnesisDescription: req.body.anamnesisDescription
        },
        { new: true },
        function (err, doc) {
            res.json({
                success: true,
                message: 'Successfully Updated the user',
                user: doc
            })
            console.log(res);
            if (err) throw err;
            console.log("1 document updated");
        });
});

router.get('/user/:id', checkJWT, (req, res, next) => {
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
