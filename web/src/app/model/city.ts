export interface City {
  id: number;
  name: string;
  temp?: number;
  sunrise?: string | Date;
  sunset?: string | Date;
  lat?: number;
  lng?: number;
}
