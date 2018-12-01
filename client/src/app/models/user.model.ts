export class User {
    _id:            number;
    label:          number;
    firstName:      string;
    lastName:       boolean;
    oib:            boolean;

    constructor(data: any = {}) {
        this._id = data._id;
        this.label = data.label;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.oib = data.oib;
    }
}
