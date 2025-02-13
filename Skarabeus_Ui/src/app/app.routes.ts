import { Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/errors/not-found-page/not-found-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FoodPageComponent } from './pages/food-page/food-page.component';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';

export const routes: Routes = [
    {
      path: '',
      component: DefaultComponent,
      children: [
        { path: '', component: HomePageComponent, title: 'Home'},
        { path: 'login', component: LoginPageComponent, title: 'Login' },
        {path:'food',
          component:FoodPageComponent,
          children:[
            {path:'ingredient',component:IngredientListComponent,title:'ingredient'},
            {path:'dish', component:DishListComponent,title:'dish'}
      ]},
        {
          path: 'not-found',
          component: NotFoundPageComponent,
          title: 'Not Found ',
        },
        /*{
          path: 'post/detail/:postId',
          component: PostDetailPage,
          title: 'Post Detail',
          resolve: { post: postDetailResolver },
        },*/
      ],
    },
    { path: '**', redirectTo: '/not-found' },
  ];