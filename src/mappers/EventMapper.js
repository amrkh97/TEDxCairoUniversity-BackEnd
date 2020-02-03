import DB from '../Database';
import Event from '../entities/Event';

class EventMapper{

    static _createEvent(row){
        console.log(row);
        return new Event(row.id, row.eventName, row.eventLocation, row.eventDate, row.eventYear, row.posterLink);
    }

    static async getEvent(id){
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

}

export default EventMapper;
