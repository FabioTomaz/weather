import * as utils from '../utils/writer';
import * as cityService from '../service/cityservice';

export function getCitiesData(req, res, next) {
  let cities = req.query[ "cities" ];
  if (cities == null || (Array.isArray(cities) && cities.length == 0)) {
    res.status(401)
      .send({message: "Please specify the cities"})
      .end();
  }

  if (!Array.isArray(cities)) {
    cities = [ cities ];
  }

  Promise.all(cities.map((city) => cityService.getCityData(city)))
    .then(function (citiesData) {
      utils.writeJson(res, citiesData, 200);
    })
    .catch(function (err) {
      res.status(err.status)
        .send({message: err.message})
        .end();
    });
}

export function getCityData(req, res, next) {
  const cityName: string = req.params.cityName;
  if (cityName == null || cityName.length == 0) {
    res.status(401)
      .send({message: "Please specify the city"})
      .end();
  }

  cityService.getCityData(cityName)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (err) {
      res.status(err.status)
        .send({message: err.message})
        .end();
    });
}
