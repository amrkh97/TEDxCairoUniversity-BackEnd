import CFG from './config';
import mysql from 'mysql';

class Database{
    constructor(){
        if(!Database.instance){
            this.connection = mysql.createConnection({
                host: CFG.database.host,
                user: CFG.database.username,
                password: CFG.database.password,
            });
            this.connection.connect((error) => { if(error) throw error; });

            Database.instance = this;
        }
        return Database.instance;
    }
    static query(sql){
        const self = new Database();
        return new Promise((resolve, reject) => {
            self.connection.query(sql, (error, result) => {
                if(error) reject(error);
                else resolve(result);
            });
        });
    }
}
export default Database;
