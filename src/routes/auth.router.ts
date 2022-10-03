import { Router } from "express";
import { AuthController } from '../controller/auth.controller';

export class AuthRouter {
    
    private controller: AuthController;
    private router: Router;

    constructor(){
        this.controller = new AuthController();
        this.router = Router();
    }

    public init(): Router {
        // Login
        this.router.post("/login", (request, response) => this.controller.login(request, response));
        // Register
        this.router.post("/register", (request, response) => this.controller.register(request, response));
        return this.router;
    }
}