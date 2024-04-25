import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private selectedDateSource = new BehaviorSubject<Date | null>(new Date());
  selectedDate = this.selectedDateSource.asObservable();

  constructor() { }

  updateSelectedDate(date: Date | null): void {
    this.selectedDateSource.next(date);
  }
}
