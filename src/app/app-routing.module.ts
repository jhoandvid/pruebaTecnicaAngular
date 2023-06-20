import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './modules/auth/auth-page/auth-page.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent ,
  },

  {
    path: '',
    component: HomePageComponent,
    loadChildren: ()=>import('./modules/home/home.module').then(m=>m.HomeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
