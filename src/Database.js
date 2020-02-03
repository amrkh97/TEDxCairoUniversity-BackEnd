import CFG from './config';
import mysql from 'mysql';

class Database{
    constructor(){
        if(!Database.instance){
            this.connection = mysql.createConnection({
                host: CFG.database.host,
                user: CFG.database.username,
                password: CFG.database.password,
                database: CFG.database.name
            });
            this.connection.connect((error) => { if(error) throw error; });

            Database.instance = this;
        }
        return Database.instance;
    }
    static query(sql, params = null){
        const self = new Database();
        return new Promise((resolve, reject) => {
            self.connection.query(sql, params, (error, result) => {
                if(error) reject(error);
                else resolve(result);
            });
        });
    }
}
export default Database;
