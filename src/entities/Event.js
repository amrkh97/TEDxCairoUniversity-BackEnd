import Entity from './Entity';

class Event extends Entity{
    constructor(id, name, location, date, year, posterLink){
        super();
        this.id = id;
        this.name = name;
        this.location = location;
        this.date = date;
        this.year = year;
        this.posterLink = posterLink;
    }
}

export default Event;
