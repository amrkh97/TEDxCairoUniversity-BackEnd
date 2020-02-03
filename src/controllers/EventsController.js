import express from 'express';
export default class EventsController{
    constructor(p1){ console.log(p1) }
    static handleRoutes(app){
        const router = express.Router();
        app.use("/events", router);

        router.get("/", (request, response) => {});
        router.get("/getAll", (request, response) => {});
        router.put("/addEvent", (request, response) => {});
        router.get("/getEventByID", (request, response) => {});
        router.get("/getEventByName", (request, response) => {});
        router.get("/getEventByGeneration", (request, response) => {});
        router.get("/deleteEvent", (request, response) => {});
    }

}
