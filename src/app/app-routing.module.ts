import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Common/components/home/home.component';
import { AboutmeComponent } from './Common/components/aboutme/aboutme.component';
import { AuthGuardService } from './Usuario/services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,  canActivate: [AuthGuardService] },
  { path: 'aboutme', component: AboutmeComponent},
  { path: 'usuario', loadChildren: () => import('./Usuario/module/usuario.module').then(m => m.UsuarioModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
