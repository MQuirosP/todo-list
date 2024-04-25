import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environmets/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = environment.openWeatherMapApiKey  // Reemplaza con tu clave API real

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
