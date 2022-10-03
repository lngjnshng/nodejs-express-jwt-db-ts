import * as bcrypt from 'bcrypt';
import { JwtUtils } from '../utils/jwtutils';
import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { IUser, User } from '../model/user';
import { ResponseUtils } from '../utils/resutils';

export class AuthController {

    private service: UserService;

    constructor(){
        this.service = new UserService();
    }

    /**
     * Login with email and password
     * @param request 
     * @param response 
     * @returns 
     */
    public login(request: Request, response: Response): void {
        const username: string = request.body.username;
        const password: string = request.body.password;
        if(!username || !password){
            response.status(400).send({message: 'username or password is missing'});
            return;
        }
        
        this.service.getByEmail(username).then( (user: User) => {
            // Check the password
            const matched: boolean = bcrypt.compareSync(password, user.password);
            if(!matched){
                response.status(401).send({message: 'username or password is not correct'});
                return;
            }
            if(!user.activated){
                response.status(403).send({message: 'User has not been activated'});
                return;
            }
            // Generate token
            const token: string = JwtUtils.sign({id: user.id, email: user.email});
            const retObj = {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                token: token
            };
            response.status(200).send(retObj);
        }).catch( e => {
            ResponseUtils.returnWithError(response, e);
        });
    }

    /**
     * Register a new user
     * @param request 
     * @param response 
     */
    public register(request: Request, response: Response): void {
        let entity = {
            email: request.body.email,
            password: request.body.password,
            firstName: request.body.firstName,
            lastName: request.body.lastName
        } as IUser;
        // TODO Check the parameters here
        this.service.create(entity).then( (user: User) => {
            response.status(201).send(user);
        }).catch( e => {
            ResponseUtils.returnWithError(response, e);
        });
    }
}