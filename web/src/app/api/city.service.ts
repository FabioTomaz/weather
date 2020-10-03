import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { City } from '../model/city';

import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class CityService {

  protected basePath = 'https://localhost:4200/data';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * Get city by city name
   *
   * @param cities The numbers of items to return
   */
  public getCitiesWeather(cities?: Array<string>): Observable<City[]> {
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

    if (cities) {
      cities.forEach((element) => {
        queryParameters = queryParameters.append('cities', <any>element);
      });
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'application/json'
    ];

    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.request<City[]>('get', `${this.basePath}/cities`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers
      }
    );
  }

  /**
   * Get city by city name
   *
   * @param cityName The name that needs to be fetched. Use Aveiro for testing.
   */
  public getCityByName(cityName: string): Observable<City> {

    if (cityName === null || cityName === undefined) {
      throw new Error('Required parameter cityName was null or undefined when calling getCityByName.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'application/json'
    ];

    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.request<City>('get', `${this.basePath}/cities/${encodeURIComponent(String(cityName))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers
      }
    );
  }

}
