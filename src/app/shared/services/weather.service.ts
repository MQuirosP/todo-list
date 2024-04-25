import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environmets/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = environment.openWeatherMapApiKey  // Reemplaza con tu clave API real
  private citySubject = new BehaviorSubject<string>('Barranca');  // Valor por defecto
  city$ = this.citySubject.asObservable();
  constructor(
    private http: HttpClient,
  ) {

  }

  setCity(city: string) {
    this.citySubject.next(city);
  }

  getWeather(city: string): Observable<any> {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=es`; // Añade `&lang=es` para español
    return this.http.get(url);
}

}
