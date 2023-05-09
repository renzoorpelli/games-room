import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { NoAuthGuardService } from '../services/noauth.service';
import { AuthGuardService } from '../services/auth.service';
import { ProfileComponent } from '../components/profile/profile.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuardService]},
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuardService]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
