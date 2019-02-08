import * as dotEnv from 'dotenv';
// Do this before evaluating the server class file
dotEnv.config();

import { Server } from './server';

const server = new Server();
server.start();
