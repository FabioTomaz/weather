import config from '../config';
import axios from 'axios';


/**
 * Get city by city name
 *
 * cities List The numbers of items to return (optional)
 * returns City[]
 **/
export function getCitiesWeather(cities) {
  return new Promise(function (resolve, reject) {
    Promise.all(cities.map((city) => getCityByName(city)))
      .then(function(arrayOfValuesOrErrors) {
        resolve(arrayOfValuesOrErrors);
      })
      .catch(function(err) {
        console.log(err.message); // some coding error in handling happened
        reject(err.message);
      });
  });
}


/**
 * Get city by city name
 *
 * cityName String The name that needs to be fetched. Use Aveiro for testing.
 * returns City
 **/
export function getCityByName(cityName) {
  return new Promise(function (resolve, reject) {
    getCityNameData(cityName).then((cityValue) => {
      resolve(cityValue);
    }).catch((error) => {
      reject(error);
    });
  });
}

async function getCityNameData(cityName) {
  console.log("request city name >> " + cityName);

  let resp = {
    "cityName": null,
    "lat": null,
    "lng": null,
    "temp": null,
    "sunset": null,
    "sunrise": null,
  };

  try {
    // Make a request for a user with a given ID
    let cityWeatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${config.api.openWeatherAPIKey}`);
    resp[ "lat" ] = cityWeatherResponse[ "coord" ][ "lat" ];
    resp[ "lng" ] = cityWeatherResponse[ "coord" ][ "lng" ];
    resp[ "temp" ] = cityWeatherResponse[ "main" ][ "temp" ];
  } catch {
    console.log("request error >> " + cityName);
    return null;
  }
  try {
    let citySunriseSunsetResponse = await axios.get(`https://api.sunrise-sunset.org/json?&lat=${resp[ "lat" ]}&lng=${resp[ "lng" ]}`);
    resp[ "sunset" ] = citySunriseSunsetResponse[ "results" ][ "sunset" ];
    resp[ "sunrise" ] = citySunriseSunsetResponse[ "results" ][ "sunrise" ];
  } catch {

  }
  return resp;
}
