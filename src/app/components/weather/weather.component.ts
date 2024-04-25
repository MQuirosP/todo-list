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
  city: string = 'Riojalandia';  // Puedes establecer una ciudad predeterminada o hacerla configurable

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: (err) => {
        console.error('Failed to get weather data:', err);
      }
    });
  }
}
