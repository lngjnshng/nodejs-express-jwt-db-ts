import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { authFilter } from './auth.filter';

export class UserRouter{
    private router: Router;
    private controller: UserController;

    constructor(){
        this.router = Router();
        this.controller = new UserController();
    }

    public init(): Router{
        
        // Create a new user
        this.router.post("/", authFilter, (request, response) => this.controller.create(request, response));
        // Update a existing user
        this.router.put("/", authFilter, (request, response) => this.controller.update(request, response));
        // Query by conditions and return with pagination format
        this.router.get("/paginate", authFilter, (request, response) => this.controller.paginate(request, response));
        // Get user information by id
        this.router.get("/:id", authFilter, (request, response) => this.controller.get(request, response));
        // Delete a user by id
        this.router.delete("/:id", authFilter, (request, response) => this.controller.delete(request, response));
        
        return this.router;
    }
}