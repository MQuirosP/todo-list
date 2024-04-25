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
  isLoading = true;
  errorMessage = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.city$.subscribe({
      next: (city) => {
        this.loadWeather(city);
      },
      error: (err) => {
        console.error('Error while getting city:', err);
      }
    });
  }

  loadWeather(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        console.log(data);
        this.weatherData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to get weather data:', err);
        this.isLoading = false;
        this.errorMessage = 'Pendiente obtener información del clima';
      }
    });
  }
}
