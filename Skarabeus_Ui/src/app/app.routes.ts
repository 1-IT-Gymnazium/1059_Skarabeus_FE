import { EventListComponent } from './components/event-list/event-list.component';
import { Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/errors/not-found-page/not-found-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FoodPageComponent } from './pages/food-page/food-page.component';
import { PeoplePageComponent } from './pages/people-page/people-page.component';
import { AuthGuard } from './guards/auth.guard';
import { UserInfoPageComponent } from './pages/user-info-page/user-info-page.component';

export const routes: Routes = [
    {
      path: '',
      component: DefaultComponent,
      children: [
        { 
          path: 'login', 
          component: LoginPageComponent, 
          title: 'Login' 
        },
        { 
          path: '', 
          component: HomePageComponent, 
          title: 'Home',
        },
        {
          path:'food',
          component:FoodPageComponent,
          canActivate: [AuthGuard],
        },
        {
          path:"events",
          component:EventListComponent,
          canActivate: [AuthGuard],
        },
        {
          path:"people",
          component:PeoplePageComponent,
          canActivate: [AuthGuard],
        },
        {
          path:"user-info",
          component:UserInfoPageComponent,
          canActivate: [AuthGuard],
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
