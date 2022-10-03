import { Request, Response } from 'express';
import { Pageable, Pagination } from '../model/patination';
import { IUser, User } from '../model/user';
import { UserService } from '../service/user.service';
import { RequestUtils } from '../utils/requtils';
import { ResponseUtils } from '../utils/resutils';

export class UserController{

    private userService : UserService;

    constructor(){
        this.userService = new UserService();
    }

    public create(request: Request, response: Response): void {
        let entity = {
            email: request.body.email,
            password: request.body.password,
            firstName: request.body.firstName,
            lastName: request.body.lastName
        } as IUser;
        // TODO Check the parameters here
        this.userService.create(entity).then( (user: User) => {
            response.status(201).send(user);
        }).catch( e => {
            ResponseUtils.returnWithError(response, e);
        });
    }

    public update(request: Request, response: Response): void {
        let entity = {
            id: request.body.id,
            email: request.body.email,
            password: request.body.password,
            firstName: request.body.firstName,
            lastName: request.body.lastName
        } as IUser;
        // TODO Check the parameters here
        this.userService.update(entity).then( (effected: number) => {
            response.status(200).send({effected: effected});
        }).catch( e => {
            ResponseUtils.returnWithError(response, e);
        });
    }

    public delete(request: Request, response: Response): void {
        const id = parseInt(request.params.id);
        this.userService.deleteById(id).then( (effected: number) => {
            response.status(200).send({effected: effected});
        }).catch( e => {
            ResponseUtils.returnWithError(response, e);
        });
    }

    public paginate(request: Request, response: Response): void {
        // Construct the query conditions
        const conditions: Map<string, any> = RequestUtils.getConditionsFromQuery(request, ['email', 'firstName', 'lastName', 'activated']);
        // Construct the pageable
        const pageable: Pageable = RequestUtils.getPageable(request);
        // Execute query
        this.userService.paginate(conditions, pageable).then( (pagination: Pagination<User>) => {
            response.status(200).send(pagination);
        }).catch( e => {
            ResponseUtils.returnWithError(response, e);
        });
    }

    public get(request: Request, response: Response): void {
        const id = parseInt(request.params.id);
        this.userService.get(id).then( (user: User) => {
            response.status(200).send(user);
        }).catch( e => {
            ResponseUtils.returnWithError(response, e);
        });
    }
}