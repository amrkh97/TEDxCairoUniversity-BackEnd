import DB from '../Database';
import Member from '../entities/Member';
import bcrypt from 'bcrypt';

class MemberMapper{

    static _create(row){
        return new Member(row.id, row.userName, row.userPassword, row.firstName, row.lastName, row.photo, row.mobileNumber, row.email);
    }

    static async get(id){
        const member = await DB.query("SELECT * FROM `TEDxCU`.`members` WHERE `id` = ?", [id]).then(result => {
            if(result.length !== 1)
                return null;
            return this._create(result[0]);
        }).catch(error => {
            console.log(error);
            return null;
        });
        return member;
    }

    static async getAll(){
        const members = await DB.query("SELECT * FROM `TEDxCU`.`members`").then(result => {
            let arr = [];
            console.log(result);
            for(let row of result){
                arr.push(this._create(row));
            }
            return arr;
        }).catch(error => {
            return [];
        });
        return members;
    }

    static async add(username, password, firstName, lastName, photo, mobileNumber, email){
        const member = await DB.query("INSERT INTO `TEDxCU`.`members` (`userName`, `userPassword`, `firstName`, `lastName`, `photo`, `mobileNumber`, `email`)" +
            "VALUES(?, ?, ?, ?, ?, ?, ?)", [username, bcrypt.hashSync(password, 10), firstName, lastName, photo, mobileNumber, email])
            .then(result => {
                return MemberMapper.get(result.insertId);
            })
            .catch(error => {
                console.log("ERRRORORORORROROR");
                return null;
            });
        console.log("MEMMEMEMM", member);
        return member;
    }

    static async getByUsername(username){
        const member = await DB.query("SELECT * FROM `TEDxCU`.`members` WHERE `userName` = ?", [username]).then(result => {
            if(result.length !== 1)
                return null;
            return this._create(result[0]);
        }).catch(error => {
            console.log(error);
            return null;
        });
        return member;
    }

}

export default MemberMapper;
