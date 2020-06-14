import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PipelinesComponent } from './components/pipelines/pipelines.component';
import { SwimlanesComponent } from './components/swimlanes/swimlanes.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'pipelines', component: PipelinesComponent },
  { path: 'pipelines/:id' , component :SwimlanesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
