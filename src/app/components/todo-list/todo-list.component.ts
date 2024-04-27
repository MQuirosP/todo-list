import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/shared/services/data.service';
import { DateService } from 'src/app/shared/services/date.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  newTask: string | undefined;
  tasks: Task[] = [];
  showSidebar: boolean = true;
  showSecondSidebar: boolean = true;
  selectedDate: Date | null = null;
  private subscriptions = new Subscription();  // Una sola instancia para manejar todas las suscripciones

  constructor(
    private mediaObserver: MediaObserver,
    private dateService: DateService,
    private dataService: DataService,
  ) {

  }

  ngOnInit() {
    // Suscripción a las tareas
    this.subscriptions.add(
      this.dataService.appState$.subscribe(state => {
        this.tasks = state.tasks;
      })
    );
    this.dataService.loadAppState();
    // Suscriçion para detectar cambios en la pantalla
    this.subscriptions.add(
      this.mediaObserver.asObservable().subscribe(this.handleMediaChange)
    );
    // Suscripción para detectar cambios en la fecha
    this.subscriptions.add(
      this.dateService.selectedDate.subscribe(date => {
        this.selectedDate = date;
      })
    );
  }

  handleMediaChange = (changes: MediaChange[]) => {
    const matchMobile = changes.some(change => change.mqAlias === 'xs' || change.mqAlias === 'sm');
    this.showSidebar = !matchMobile;
    this.showSecondSidebar = !matchMobile;
  };

  addTask() {
    if (this.newTask && this.selectedDate) {
      this.tasks.push({ title: this.newTask, completed: false, date: this.selectedDate });
      this.dataService.saveAppState();
      this.newTask = '';
    } else {
      console.error('No date selected. Please select a date before adding a task.');
    }
  }

  editTask(index: number) {
    const task = this.tasks[index];
    const newTitle = prompt('Edit Task', task.title);
    if (newTitle !== null) {
      this.tasks[index].title = newTitle;
      this.updateChanges();
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.updateChanges();
  }

  updateChanges() {
    this.dataService.saveAppState();
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  ngOnDestroy() {
    // Desuscribirse de todas las suscripciones con una sola llamada
    this.subscriptions.unsubscribe();
  }
}
