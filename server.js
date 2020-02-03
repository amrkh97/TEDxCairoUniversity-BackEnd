import express from 'express';
import EventsController from './src/controllers/EventsController';
import JWT from 'jsonwebtoken';

const app = express();

// All configuration for the server will go here
const serverCfg = {
    port: 3000,
    jwtSecret: "tedXExtremlySecretAndLongKey"
};


// To process JSON requests automatically
app.use(express.json());

/**
 * This is the middleware used to authenticate users
 * Side Effect: Add an "auth" key to the request which is and object with {authorized: boolean, data: any}
 */
app.use((request, _, next) => {
    request.auth = {authorized: false, data: null};
    try{
        const bundled = request.headers.authorization;
        const data = JWT.verify(bundled, serverCfg.jwtSecret);
        request.auth = {authorized: true, data};
    }finally{
        next();
    }
});

/**
 * Include this as middleware in routes that strictly needs authentication
 */
function mustAuthorize(request, response, next){
    if(request.auth.authorized)
        next();
    else
        response.status(401).send({error: true, message: "You are no authorized to access this endpoint"});
}

// Root is not supported here
app.all("/", (_, response) => {
    response.status(400).send({"error": true, "message": "Malformed request"});
});


// Dummy login using JWT
app.post("/login", (request, response) => {
    // TODO: Use a real payload and login function
    const payload = {username: request.body.username};
    const token = JWT.sign(payload, serverCfg.jwtSecret);
    response.status(200).send({token});
});


// Delegate routes to their controllers
EventsController.handleRoutes(app);



app.listen(serverCfg.port, () => {
    console.log("Server is up");
});

