import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './modules/auth/auth-page/auth-page.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { SessionGuard } from './core/guards/session.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent,
    loadChildren: ()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },

  {
    path: 'dashboard',
    component: HomePageComponent,
    loadChildren: ()=>import('./modules/home/home.module').then(m=>m.HomeModule),
    canActivate: [SessionGuard]
  },

  {
    path:'**',
    redirectTo: '/dashboard',

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
