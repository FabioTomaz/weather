export interface CityWeather {
  id: number;
  name: string;
  temp?: number;
  lat?: number;
  lng?: number
}

export interface CityRises {
  sunrise: string;
  sunset: string;
}

export interface CityData {
  id: number;
  name: string;
  temp?: number;
  sunrise?: string;
  sunset?: string;
  lat?: number;
  lng?: number
}
