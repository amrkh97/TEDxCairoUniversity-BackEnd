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
            this.connection.connect((error) => {
                if(error){
                    console.log("Error: ", error);
                    throw "Cannot connect to database";
                }
            });

            Database.instance = this;
        }
        return Database.instance;
    }
}
export default Database;
