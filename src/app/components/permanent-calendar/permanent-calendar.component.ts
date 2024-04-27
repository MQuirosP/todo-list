import { DateService } from '../../shared/services/date.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-permanent-calendar',
  templateUrl: './permanent-calendar.component.html',
  styleUrls: ['./permanent-calendar.component.css']
})
export class PermanentCalendarComponent {

  constructor(
    private dateService: DateService,
  ) {}
  selectedDate: Date = new Date();

  // Función para deshabilitar fechas anteriores a la actual
  myFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return date ? date >= today : false;
  };

  onSelect(date: Date | null): void {
    if (date) {
      this.selectedDate = date;
      this.dateService.updateSelectedDate(date)
    }
  }
}
