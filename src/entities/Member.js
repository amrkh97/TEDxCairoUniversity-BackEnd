import Entity from './Entity';

class Member extends Entity{
    constructor(id, username, password, firstName, lastName, photo, mobileNumber, email){
        super();
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.mobileNumber = mobileNumber;
        this.email = email;
    }
    get serializable(){
        let copy = Object.assign({}, this);
        delete copy.password;
        return copy;
    }
}

export default Member;
