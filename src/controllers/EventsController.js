import express from 'express';
import EventMapper from '../mappers/EventMapper';
export default class EventsController{
    static eventNotFound(response, next){
        response.status(404).send({
            error: true,
            messae: "The requested event was not found"
        });
        next();
    }

    static handleRoutes(path, app){
        const router = express.Router();
        app.use(path, router);

        router.get("/getAll", async (_, response) => {
            const events_ent = await EventMapper.getAll();
            const events = events_ent.map(elem => (elem.serializable));
            response.send({events, error: false});
        });

        router.put("/addEvent", (request, response) => {});

        router.get("/getEventByID/:id", async (request, response, next) => {
            const event = await EventMapper.get(parseInt(request.params.id));
            if(event === null){
                EventsController.eventNotFound(response, next);
            }
            response.send({evetn: event.serializable, error: false});

        });

        router.get("/getEventByName", (request, response) => {});
        router.get("/getEventByGeneration", (request, response) => {});
        router.get("/deleteEvent", (request, response) => {});
    }

}
