import { Router } from 'express';
import * as cityController from '../controllers/city';

const route = Router();

export default (app: Router) => {
  route.get('/data', cityController.getCitiesData);
  route.get('/data/:cityName', cityController.getCityData);

  app.use(route);
};
