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
  selectedDate: Date = new Date();  // Asegura que se inicializa con un valor no nulo.

  // Función para deshabilitar fechas anteriores a la actual
  myFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establece la hora a cero.
    return date ? date >= today : false;
  };

  onSelect(date: Date | null): void {
    if (date) {  // Verifica si la fecha no es nula antes de asignar.
      this.selectedDate = date;
      this.dateService.updateSelectedDate(date)
    }
  }
}
