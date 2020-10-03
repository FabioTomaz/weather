import * as utils from '../utils/writer';
import * as cityService from '../service/cityservice';

export function getCitiesWeather(req, res, next, cities) {
  cityService.getCitiesWeather(cities)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}

export function getCityByName(req, res, next, cityName) {
  cityService.getCityByName(cityName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}
