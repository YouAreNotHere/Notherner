import { Application } from 'express';
import { authRouter } from './auth.routes';

const initRouting = (app: Application) => {
  app.use('/auth', authRouter);
};

export { initRouting };
