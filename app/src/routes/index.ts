import { Router } from 'express';
import cityRoutes from './cityroutes';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  cityRoutes(app);

  return app
}
