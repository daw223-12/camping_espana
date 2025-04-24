import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { authGuard } from './guards/auth.guard';
import { PlacePageComponent } from './pages/place-page/place-page.component';


// TODO: Hacer guards
const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: LoginPageComponent },
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: 'user', component: UserPageComponent},
      { path: 'map', component: MapPageComponent },
      { path: 'place', component: PlacePageComponent},
      { path: '**', component: NotFoundPageComponent }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
