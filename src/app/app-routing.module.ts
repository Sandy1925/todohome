import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PendingComponent } from './pending/pending.component';
import { CompletedComponent } from './completed/completed.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {path:"home/:email", component:HomeComponent,pathMatch: 'prefix'},
  {path: "",component:HomeComponent,pathMatch:'prefix'},
  {path:"pending/:email",component:PendingComponent,pathMatch:'prefix'},
  {path:"completed/:email",component:CompletedComponent,pathMatch:'prefix'},
  {path:"history/:email",component:HistoryComponent,pathMatch:'prefix'},
  {path:"profile/:email",component:ProfileComponent,pathMatch:'prefix'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
