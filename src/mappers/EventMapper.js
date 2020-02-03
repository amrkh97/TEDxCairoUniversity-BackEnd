import DB from '../Database';
import Event from '../entities/Event';

class EventMapper{

    static _createEvent(row){
        console.log(row);
        return new Event(row.id, row.eventName, row.eventLocation, row.eventDate, row.eventYear, row.posterLink);
    }

    static async get(id){
        const event = await DB.query("SELECT * FROM `TEDxCU`.`events` WHERE `id` = ?", [id]).then(result => {
            if(result.length !== 1)
                return null;
            return this._createEvent(result[0]);
        }).catch(error => {
            console.log(error);
            return null;
        });
        return event;
    }
    static async getAll(){
        const events = await DB.query("SELECT * FROM `TEDxCU`.`events`").then(result => {
            let arr = [];
            console.log(result);
            for(let row of result){
                arr.push(this._createEvent(row));
            }
            return arr;
        }).catch(error => {
            return [];
        });
        return events;
    }

}

export default EventMapper;
