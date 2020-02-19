import express from 'express';
import JWT from 'jsonwebtoken';
import CFG from './../config';
import Member from '../entities/Member';
import MemberMapper from '../mappers/MemberMapper';
import bcrypt from 'bcrypt';

class AuthController{
    /**
     * This is the middleware used to authenticate users
     * Side Effect: Add an "auth" key to the request which is and object with {authorized: boolean, data: any}
     */
    static middleware(request, _, next){
        request.auth = {authorized: false, data: null};
        try{
            const bundled = request.headers.authorization;
            if(!bundled) throw null;
            const data = JWT.verify(bundled, CFG.jwtSecret);
            request.auth = {authorized: true, data};
        }catch(error){
            console.log(error);
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

        router.post("/addUser", async (request, response) => {
            const username = request.body.username;
            const password = request.body.password;
            const firstName = request.body.firstName;
            const lastName = request.body.lastName;
            const photo = request.body.photo;
            const mobileNumber = request.body.mobileNumber;
            const email = request.body.email;
            const member = await MemberMapper.add(username, password, firstName, lastName, photo, mobileNumber, email);
            console.log("HERRE", member);
            if(member === null){
                response.status(400).send({error: true, message: "Could not add member, username exists"});
            }else{
                response.send({error: false, username});
            }
        });

        router.post("/login", async (request, response) => {
            const username = request.body.username;
            const password = request.body.password;
            const member = await MemberMapper.getByUsername(username);
            if(member !== null && bcrypt.compareSync(password, member.password)){
                const payload = {username};
                const token = JWT.sign(payload, CFG.jwtSecret);
                response.send({error: false, token});
            }else{
                response.status(400).send({error: true, message: "Incorrect credentials"});
            }
        });
    }
}

export default AuthController;
