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

module.exports = router;
