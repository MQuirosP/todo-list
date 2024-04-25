import { Component, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { fadeAnimation } from './shared/transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnDestroy {
  newTask: string | undefined;
  tasks: { title: string, completed: boolean }[] = [];
  showSidebar: boolean = true;
  showSecondSidebar: boolean = true;
  isMobile: boolean = false;
  private mediaSub: Subscription;

  constructor(private mediaObserver: MediaObserver) {
    this.mediaSub = this.mediaObserver.asObservable().subscribe(this.handleMediaChange);
  }

  handleMediaChange = (changes: MediaChange[]) => {
    this.isMobile = changes.some(change => change.mqAlias === 'xs' || change.mqAlias === 'sm');
    this.showSidebar = !this.isMobile;
    this.showSecondSidebar = !this.isMobile;
  };


  addTask() {
    if (this.newTask) {
      this.tasks.push({ title: this.newTask, completed: false });
      this.newTask = ''; // Clear input after adding
    }
  }

  editTask(index: number) {
    const task = this.tasks[index];
    const newTitle = prompt('Edit Task', task.title);
    if (newTitle !== null) {
      this.tasks[index].title = newTitle;
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
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
