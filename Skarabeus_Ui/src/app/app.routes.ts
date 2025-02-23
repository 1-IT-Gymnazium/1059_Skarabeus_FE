import { EventListComponent } from './components/event-list/event-list.component';
import { Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/errors/not-found-page/not-found-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FoodPageComponent } from './pages/food-page/food-page.component';
import { PersonsListComponent } from './components/persons-list/persons-list.component';

export const routes: Routes = [
    {
      path: '',
      component: DefaultComponent,
      children: [
        { path: '', component: HomePageComponent, title: 'Home'},
        { path: 'login', component: LoginPageComponent, title: 'Login' },
        {
          path:'food',
          component:FoodPageComponent
        },
        {
          path:"calendar",
          component:EventListComponent
        },
        {
          path:"persons",
          component:PersonsListComponent
        },
        {
          path: 'not-found',
          component: NotFoundPageComponent,
          title: 'Not Found ',
        }
      ],
    },
    { path: '**', redirectTo: '/not-found' },
  ];
