import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { AppComponent } from './app.component'; // Asumiendo que es tu componente principal

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: '', component: AppComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
