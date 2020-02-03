import express from 'express';
import EventsController from './src/controllers/EventsController';

const app = express();

// All configuration for the server will go here
const serverCfg = {
    // PRODUCTION: Change to 80
    port: 3000
};


// To process JSON requests automatically
app.use(express.json());

// Root is not supported here
app.all("/", (_, response) => {
    response.status(400).send({"error": true, "message": "Malformed request"});
});

EventsController.handleRoutes(app);



app.listen(serverCfg.port, () => {
    console.log("Server is up");
});

