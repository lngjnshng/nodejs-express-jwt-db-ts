import express, { Express } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { XltRouter } from './routes';

export class Server{

    private server: Express;
    private router: XltRouter;

    constructor(){
        this.server = express();
        this.server.set('port', process.env.PORT || 3000);
        this.server.use(helmet());
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({extended: true}));
        // Use the router
        this.router = new XltRouter(this.server);
        this.router.init();
    }

    public start(): void {
        const port: number = this.server.get('port');
        this.server.listen(port, () => {
            console.log(`Server is listening to port ${port}`);
        });
    }
}