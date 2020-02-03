import express from 'express';
import CFG from './src/config';
import EventsController from './src/controllers/EventsController';
import AuthController from './src/controllers/AuthController';

const app = express();

// To process JSON requests automatically
app.use(express.json());
app.use(AuthController.middleware);

// Root endpoint
app.all("/", (_, response) => {
    response.status(400).send({"error": true, "message": "Malformed request"});
});

// Delegate routes to their controllers
AuthController.handleRoutes(app);
EventsController.handleRoutes(app);


// Start listening
app.listen(CFG.port, () => {
    console.log("Server is up");
});

