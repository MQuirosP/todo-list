// settings.component.ts
import { Component } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  currentLocation: string = 'Barranca';

  constructor(private weatherService: WeatherService) {
    this.weatherService.city$.subscribe(city => this.currentLocation = city);
  }

  updateLocation() {
    this.weatherService.setCity(this.currentLocation);
  }
}

