import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridsterComponent } from './gridster/gridster.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'board',
    component: GridsterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
