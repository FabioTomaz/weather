import config from '../config';
import axios, { AxiosResponse } from "axios";
import { WeatherResponse } from "../models/weather";
import { RisesResponse } from "../models/rises";

const openWeatherMapAPI = axios.create({
  baseURL: 'http://api.openweathermap.org/'
});

const sunAPI = axios.create({
  baseURL: 'https://api.sunrise-sunset.org/'
});

/**
 * Get city data
 *
 * cityName String The name that needs to be fetched. Use Aveiro for testing.
 * returns City
 **/
export function getCityData(cityName: string) {
  return getCityWeather(cityName).then((cityWeather) => {
    return getCitySunriseSunset(cityWeather[ "lat" ], cityWeather[ "lng" ]).then((cityRise) => {
      return {
        ...cityWeather,
        ...cityRise
      };
    });
  }).catch(function (error) {
    throw(error);
  });
}

/**
 * Get city weather
 *
 * cityName String The name that needs to be fetched. Use Aveiro for testing.
 * returns Promise<CityWeather>
 **/
function getCityWeather(cityName: string) {
  return openWeatherMapAPI.get<WeatherResponse>(`/data/2.5/weather?units=metric&q=${cityName}&appid=${config.api.openWeatherAPIKey}`).then((cityWeatherResponse) => {
    if (cityWeatherResponse.status != 200) {
      const err = new Error(cityWeatherResponse.statusText);
      err[ 'status' ] = cityWeatherResponse.status;
      throw err;
    }

    return {
      id: cityWeatherResponse.data.id,
      name: cityWeatherResponse.data.name,
      temp: cityWeatherResponse.data.main.temp,
      lat: cityWeatherResponse.data.coord.lat,
      lng: cityWeatherResponse.data.coord.lon,
    };
  }).catch(function (error) {
    throw({
      status: error.response.status,
      message: error.message
    });
  });
}

/**
 * Get city sunrise and sunset
 *
 * lat Number The latitude of the city.
 * lng Number The longitude of the city.
 * returns Promise<CityRises>
 **/
function getCitySunriseSunset(lat: number, lng: number) {
  return sunAPI.get<RisesResponse>(`/json?&lat=${lat}&lng=${lng}`).then((cityRisesResponse: AxiosResponse<RisesResponse>) => {
    if (cityRisesResponse.status != 200) {
      const err = new Error(cityRisesResponse.statusText);
      err[ 'status' ] = cityRisesResponse.status;
      throw err;
    }

    return {
      sunrise: cityRisesResponse.data.results.sunrise,
      sunset: cityRisesResponse.data.results.sunset
    }
  }).catch(function (error) {
    throw({
      status: error.response.status,
      message: error.message
    });
  });
}
