// weather.component.ts
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData?: any;
  isLoading = true;  // Añadir un indicador de carga
  errorMessage = '';  // Mensaje de error

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {
    this.weatherService.getWeather('Riojalandia').subscribe({
      next: (data) => {
        this.weatherData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to get weather data:', err);
        this.isLoading = false;
        this.errorMessage = 'Pendiente obtener información del clima';  // Configurar mensaje de error
      }
    });
  }
}
