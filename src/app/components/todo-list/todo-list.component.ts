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
  selectedDate: Date | null = null;;
  private mediaSub: Subscription;
  private dateSubscription = new Subscription();
  private subscriptions = new Subscription();


  constructor(
    private mediaObserver: MediaObserver,
    private dateService: DateService,
    private dataService: DataService,
  ) {
    this.mediaSub = this.mediaObserver.asObservable().subscribe(this.handleMediaChange);
    this.dateSubscription.add(this.dateService.selectedDate.subscribe(date => {
      this.selectedDate = date;
    }));
  }

  ngOnInit() {
    // Suscríbete al BehaviorSubject del servicio para inicializar selectedDate
    this.dateSubscription.add(this.dateService.selectedDate.subscribe(date => {
      this.selectedDate = date;
    }));
    this.subscriptions.add(
      this.dataService.appState$.subscribe(state => {
        this.tasks = state.tasks;
      })
    );
    this.dataService.loadAppState();
  }

  handleMediaChange = (changes: MediaChange[]) => {
    const matchMobile = changes.some(change => change.mqAlias === 'xs' || change.mqAlias === 'sm');
    this.showSidebar = !matchMobile;
    this.showSecondSidebar = !matchMobile;
  };

  addTask() {
    if (this.newTask && this.selectedDate) {  // Ensure selectedDate is not null
      this.tasks.push({ title: this.newTask, completed: false, date: this.selectedDate });
      this.dataService.saveAppState();
      this.newTask = ''; // Clear input after adding
    } else {
      // Handle the case where selectedDate is null
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
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }
}
