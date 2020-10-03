import { Router } from 'express';
import * as cityController from '../controllers/city';

const route = Router();

export default (app: Router) => {
  app.use(route);

  route.get('cities', cityController.getCitiesWeather);
  route.get('cities/:cityName', cityController.getCityByName);
};
