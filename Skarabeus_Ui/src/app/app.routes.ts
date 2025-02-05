import { Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/errors/not-found-page/not-found-page.component';

export const routes: Routes = [
    {
      path: '',
      component: DefaultComponent,
      children: [
        //{ path: '', component: HomePageComponent, title: 'Home', canActivate: [AuthGuard] },
        { path: 'login', component: LoginPageComponent, title: 'Login' },
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