// settings.component.ts
import { Component } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  currentLocation: string = 'Puntarenas, CR';

  constructor(
    private weatherService: WeatherService,
    private dataService: DataService,
  ) {
    this.weatherService.city$.subscribe(city => this.currentLocation = city);
  }

  updateLocation() {
    this.weatherService.setCity(this.currentLocation);
    this.dataService.updateLocation(this.currentLocation);
    setTimeout(() => {
      this.dataService.saveAppState()
      , 1000;
    })
  }
}

