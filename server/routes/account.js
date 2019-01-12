const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Employee = require('../models/employee');
const config = require('../config');
const checkJWT = require('../middlewares/check-jwt');


router.post('/signup', (req, res, next) => {
    let employee = new Employee();
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.password = req.body.password;

    Employee.findOne({ email: req.body.email }, (err, existingEmployee) => {
        if (existingEmployee) {
            res.json({
                success: false,
                message: 'Account with that email is already exist'
            });
        } else {
            employee.save();

            var token = jwt.sign({
                employee: employee
            }, config.secret, {
                    expiresIn: '7d'
                });

            res.json({
                success: true,
                message: 'Enjoy your token',
                token: token
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    Employee.findOne({ email: req.body.email }, (err, employee) => {
        if (err) throw err;

        if (!employee) {
            res.json({
                success: false,
                message: 'Authenticated failed, Employee not found'
            });
        } else if (employee) {

            var validPassword = employee.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password'
                });
            } else {
                var token = jwt.sign({
                    employee: employee
                }, config.secret, {
                        expiresIn: '7d'
                    });

                res.json({
                    success: true,
                    mesage: "Enjoy your token",
                    token: token
                });
            }
        }

    });
});

router.route('/profile')
    .get(checkJWT, (req, res, next) => {
        Employee.findOne({ _id: req.decoded.employee._id }, (err, employee) => {
            res.json({
                success: true,
                employee: employee,
                message: "Successful"
            });
        });
    })
    .post(checkJWT, (req, res, next) => {
        User.findOne({ _id: req.decoded.user._id }, (err, user) => {
            if (err) return next(err);

            if (req.body.name) user.name = req.body.name;
            if (req.body.email) user.email = req.body.email;
            if (req.body.password) user.password = req.body.password;

            user.isSeller = req.body.isSeller;

            user.save();
            res.json({
                success: true,
                message: 'Successfully edited your profile'
            });
        });
    });

module.exports = router;
