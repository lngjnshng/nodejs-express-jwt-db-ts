import { Express } from 'express';
import { AuthRouter } from './auth.router';
import { UserRouter } from './user.router';

export class XltRouter{
    private app: Express;
    
    constructor(app: Express){
        this.app = app;
    }

    public init(): void{
        this.app.use("/auth", new AuthRouter().init());
        this.app.use("/api/user", new UserRouter().init());
    }
}