import express from 'express';
import JWT from 'jsonwebtoken';
import CFG from './../config';

class AuthController{
    /**
     * This is the middleware used to authenticate users
     * Side Effect: Add an "auth" key to the request which is and object with {authorized: boolean, data: any}
     */
    static middleware(request, _, next){
        request.auth = {authorized: false, data: null};
        try{
            const bundled = request.headers.authorization;
            const data = JWT.verify(bundled, CFG.jwtSecret);
            request.auth = {authorized: true, data};
        }finally{
            next();
        }
    }
    static mustAuthorize(request, response, next){
        if(request.auth.authorized)
            next();
        else
            response.status(401).send({error: true, message: "You are no authorized to access this endpoint"});
    }
    static handleRoutes(path, app){
        const router = express.Router();
        app.use(path, router);

        // Dummy login using JWT
        app.post("/login", (request, response) => {
            // TODO: Use a real payload and login function
            const payload = {username: request.body.username};
            const token = JWT.sign(payload, CFG.jwtSecret);
            response.status(200).send({token});
        });
    }
}

export default AuthController;
