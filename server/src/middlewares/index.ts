import { Application } from 'express';
import { sessionMiddleware } from './session.middleware';
import bodyParser from 'body-parser';
import cors from 'cors';

const initMiddlewares = (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

  sessionMiddleware(app);
};

export { initMiddlewares };
