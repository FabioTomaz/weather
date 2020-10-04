interface Coordinates {
  lon: number,
  lat: number
}

interface Conditions {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number
}

export interface WeatherResponse {
  id: number,
  name: string,
  coord: Coordinates,
  main: Conditions
}
