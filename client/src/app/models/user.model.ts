export class User {
    _id:                number;
    id:                 string;
    label:              string;
    firstName:          string;
    lastName:           string;
    oib:                number;
    gender:             string;
    entryDate:          Date;
    fatherName:         string;
    birthDate:          Date;
    birthCity:          string;
    birthMunicipality:  string;
    birthCountry:       string;
    placeOfResidence:   string;
    service:            string;
    remark:             string;
    education:          string;
    created:            Date;

    constructor(data: any = {}) {
        if (data) {
            this._id = data._id;
            this.id = data.id;
            this.label = data.label;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.oib = data.oib;
            this.gender = data.gender;
            this.entryDate = data.entryDate;
            this.fatherName = data.fatherName;
            this.birthDate = data.birthDate;
            this.birthCity = data.birthCity;
            this.birthMunicipality = data.birthMunicipality;
            this.birthCountry = data.birthCountry;
            this.placeOfResidence = data.placeOfResidence;
            this.service = data.service;
            this.remark = data.remark;
            this.education = data.education;
            this.created = data.created;
        } else {
            this._id = null;
            this.id = '';
            this.label = '';
            this.firstName = '';
            this.lastName = '';
            this.oib = null;
            this.gender = '';
            this.entryDate = null;
            this.fatherName = '';
            this.birthDate = null;
            this.birthCity = '';
            this.birthMunicipality = '';
            this.birthCountry = '';
            this.placeOfResidence = '';
            this.service = '';
            this.remark = '';
            this.education = '';
            this.created = null;
        }
    }
}
