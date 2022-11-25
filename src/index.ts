import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from './constant/types';
import { UserService } from './service/user';
import './controller/home';
import './controller/user';
import * as express from 'express';

// load everything needed to the Container
const container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);

// start the server
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(
    express.urlencoded({
      extended: true
    })
  );
  app.use(express.json());
});

const serverInstance = server.build();
serverInstance.listen(3000);

console.log('Server started on port 3000 :)');
