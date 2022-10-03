import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';

const jwtSecret: Secret = process.env.JWT_SECERT || 'xlongitdefaultjwtsecret';

export const authFilter = (request: Request, response: Response, next: NextFunction ) => {
    const authHeader = request.header('Authorization');
    if(undefined === authHeader || authHeader === null){
        response.status(401).send({message: 'Authorization header is missing'});
        return;
    }
    if(authHeader.length === 0){
        response.status(401).send({message: 'Authorization header is empty'});
        return;
    }
    const items: string[] = authHeader.split(" ");
    if(items.length !== 2){
        response.status(401).send({message: 'Invalid authorization header'});
        return;
    }
    if(items[0].toLowerCase() !== 'bearer'){
        response.status(401).send({message: 'Invalid authorization header'});
        return;
    }
    const token = items[1];
    try{
        jwt.verify(token, jwtSecret);
        next();
    }catch(e){
        response.status(401).send({message: 'Invalid token'});
        return;
    }
};