import dotenv from 'dotenv';
import { Server } from './Server';

dotenv.config();

const server: Server = new Server();
server.start();