// import { AppState, Task } from './../interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppState, Task } from '../interfaces';

// interface Task {
//   title: string;
//   completed: boolean;
//   date: Date;
// }

// interface AppState {
//   location: string;
//   tasks: Task[];
// }

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private appState: AppState = {
    location: 'Puntarenas',  // Valor predeterminado
    tasks: []
  };

  private appStateSubject = new BehaviorSubject<AppState>(this.appState);
  appState$ = this.appStateSubject.asObservable();

  constructor() { }

  updateLocation(location: string) {
    this.appState.location = location;
    this.appStateSubject.next(this.appState);
  }

  addTask(task: Task) {
    this.appState.tasks.push(task);
    this.appStateSubject.next(this.appState);
  }

  saveAppState() {
    // Aquí podrías serializar `this.appState` a JSON y guardar en localStorage o enviar a un servidor
    localStorage.setItem('appState', JSON.stringify(this.appState));
  }

  loadAppState() {
    // Carga el estado de la aplicación desde localStorage o un servidor
    const state = localStorage.getItem('appState');
    if (state) {
      this.appState = JSON.parse(state);
      this.appStateSubject.next(this.appState);
    }
  }
}
