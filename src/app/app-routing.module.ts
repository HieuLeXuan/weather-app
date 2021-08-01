import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuards } from './guards/app.guards';
import { AuthGuards } from './guards/auth.guards';
import { AddComponent } from './pages/add/add.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuards] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuards] },
  { path: 'home', component: HomeComponent, canActivate: [AppGuards] },
  { path: 'add', component: AddComponent },
  // {path: 'details/:city', component: DetailsComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
