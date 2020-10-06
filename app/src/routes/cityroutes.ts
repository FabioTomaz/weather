import { Router } from 'express';
import * as cityController from '../controllers/city';
import config from '../config';

const route = Router();

export default (app: Router) => {
  route.get(config.api.apiPrefix, cityController.getCitiesData);
  route.get(config.api.apiPrefix + '/:cityName', cityController.getCityData);

  app.use(route);
};
