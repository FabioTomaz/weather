import { Router } from 'express';
import cityRoutes from './cityroutes';
import webRoutes from './webroutes';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  cityRoutes(app);
  webRoutes(app);

  return app
}
