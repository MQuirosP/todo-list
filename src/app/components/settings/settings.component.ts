import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  currentLocation: string = '';

  constructor(private dataService: DataService) {
    this.dataService.appState$.subscribe(state => {
      this.currentLocation = state.location;
    });
  }

  updateLocation() {
    this.dataService.updateLocation(this.currentLocation);
    this.dataService.saveAppState();  // Guardar el estado actualizado
  }
}
