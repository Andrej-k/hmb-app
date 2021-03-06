const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: { type: String, unique: true },
    label: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    oib: { type: Number },
    gender: { type: String },
    fatherName: { type: String },
    birthDate: { type: Date },
    birthCity: { type: String },
    birthMunicipality: { type: String },
    birthCountry: { type: String },
    placeOfResidence: { type: String },
    service: { type: String },
    remark: { type: String },
    education: { type: String },
    created: { type: Date, default: Date.now },
    noteDate: { type: Date },
    noteEmployee: { type: String },
    noteDescription: { type: String },
    anamnesisDate: { type: Date },
    anamnesisDescription: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
