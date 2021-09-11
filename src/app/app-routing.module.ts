import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridsterComponent } from './gridster/gridster.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [{
      path: 'home',
      component: HomeComponent
    }, {
      path: 'board',
      component: GridsterComponent
    }, {
      path: 'settings',
      component: SettingsComponent
    }]
  }, {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
