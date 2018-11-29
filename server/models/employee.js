const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const EmployeeSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    name: String,
    password: String,
    created: { type: Date, default: Date.now },
});


EmployeeSchema.pre('save', function (next) {
    var employee = this;

    if (!employee.isModified('password')) return next();

    bcrypt.hash(employee.password, null, null, function (err, hash) {
        if (err) return next(err);

        employee.password = hash;
        next();
    });
});

EmployeeSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Employee', EmployeeSchema);


