import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { TodoListComponent } from './components/todo-list/todo-list.component'; // Asegúrate de importar TodoListComponent

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'todos', component: TodoListComponent },  // Ruta para TodoListComponent
  { path: '', redirectTo: '/todos', pathMatch: 'full' }  // Redirecciona la ruta raíz a TodoListComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
